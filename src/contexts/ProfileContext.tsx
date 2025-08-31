import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface Profile {
  userId: string
  name: string
  age: number
  gender: string
  location: string
  bio: string
  lookingFor: string
  hobbies: string[]
  profilePicture: string
  createdAt: string
}

interface Match {
  id: string
  users: string[]
  createdAt: string
}

interface ProfileContextType {
  profiles: Profile[]
  matches: Match[]
  currentProfile: Profile | null
  createProfile: (profileData: Omit<Profile, 'userId' | 'createdAt'>) => Promise<{ success: boolean; message?: string }>
  getProfiles: () => Promise<void>
  getMatches: () => Promise<void>
  createMatch: (userId1: string, userId2: string) => Promise<{ success: boolean; message?: string }>
  isLoading: boolean
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}

interface ProfileProviderProps {
  children: ReactNode
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const { user } = useAuth()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const createProfile = async (profileData: Omit<Profile, 'userId' | 'createdAt'>) => {
    if (!user) return { success: false, message: 'User not authenticated' }

    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      const data = await response.json()

      if (data.success) {
        await getProfiles()
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  const getProfiles = async () => {
    if (!user) return

    try {
      setIsLoading(true)
      const response = await fetch('/api/profiles')
      const data = await response.json()

      if (data.success) {
        // Filter out current user's profile
        const filteredProfiles = data.profiles.filter((profile: Profile) => profile.userId !== user.id)
        setProfiles(filteredProfiles)
      }
    } catch (error) {
      console.error('Error fetching profiles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getMatches = async () => {
    if (!user) return

    try {
      const response = await fetch('/api/matches')
      const data = await response.json()

      if (data.success) {
        setMatches(data.matches)
      }
    } catch (error) {
      console.error('Error fetching matches:', error)
    }
  }

  const createMatch = async (userId1: string, userId2: string) => {
    try {
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId1, userId2 }),
      })

      const data = await response.json()

      if (data.success) {
        await getMatches()
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  useEffect(() => {
    if (user) {
      getProfiles()
      getMatches()
    }
  }, [user])

  const value = {
    profiles,
    matches,
    currentProfile,
    createProfile,
    getProfiles,
    getMatches,
    createMatch,
    isLoading,
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}
