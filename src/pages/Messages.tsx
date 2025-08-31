import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'

interface Message {
  id: string
  text: string
  sender: string
  timestamp: string
  isOwn: boolean
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: Message[]
}

const Messages: React.FC = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://placehold.co/50',
      lastMessage: 'Hey! How are you doing today?',
      lastMessageTime: '2h ago',
      unreadCount: 3,
      messages: [
        { id: '1', text: 'Hey there! How\'s your day going?', sender: 'Alex', timestamp: '2:30 PM', isOwn: false },
        { id: '2', text: 'Hi Alex! It\'s going well, thanks for asking. How about you?', sender: 'You', timestamp: '2:32 PM', isOwn: true },
        { id: '3', text: 'Pretty good! I was thinking about our conversation about hiking. There\'s a great trail near the city if you\'re interested in checking it out this weekend?', sender: 'Alex', timestamp: '2:34 PM', isOwn: false },
        { id: '4', text: 'That sounds amazing! I\'d love to join you. What time were you thinking?', sender: 'You', timestamp: '2:36 PM', isOwn: true },
        { id: '5', text: 'How about Saturday morning around 9am? We could grab coffee first if you\'d like.', sender: 'Alex', timestamp: '2:38 PM', isOwn: false }
      ]
    },
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://placehold.co/50',
      lastMessage: 'Looking forward to our date!',
      lastMessageTime: '1d ago',
      unreadCount: 0,
      messages: []
    },
    {
      id: '3',
      name: 'Jamie Wilson',
      avatar: 'https://placehold.co/50',
      lastMessage: 'Thanks for the great conversation!',
      lastMessageTime: '3d ago',
      unreadCount: 0,
      messages: []
    },
    {
      id: '4',
      name: 'Taylor Smith',
      avatar: 'https://placehold.co/50',
      lastMessage: 'Are you free this weekend?',
      lastMessageTime: '5d ago',
      unreadCount: 0,
      messages: []
    }
  ])

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    }

    // Add message to conversation
    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      lastMessageTime: 'Just now'
    }

    setSelectedConversation(updatedConversation)
    setNewMessage('')

    // Simulate reply after 1-3 seconds
    setTimeout(() => {
      const replies = [
        "That sounds great!",
        "I'd love that!",
        "What time works for you?",
        "Looking forward to it!",
        "Sounds like a plan!"
      ]
      const randomReply = replies[Math.floor(Math.random() * replies.length)]
      
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomReply,
        sender: selectedConversation.name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false
      }

      const updatedWithReply = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, replyMessage],
        lastMessage: randomReply,
        lastMessageTime: 'Just now'
      }

      setSelectedConversation(updatedWithReply)
    }, 1000 + Math.random() * 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <>
      <Navbar />
      
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0">
                <h2 className="mb-0 fw-bold">Messages</h2>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  {conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      className={`list-group-item list-group-item-action ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="d-flex align-items-center">
                        <img src={conversation.avatar} alt="User" className="rounded-circle me-3" width="50" height="50" />
                        <div>
                          <h6 className="mb-0 fw-bold">{conversation.name}</h6>
                          <small className={selectedConversation?.id === conversation.id ? 'text-white' : 'text-muted'}>
                            {conversation.lastMessage}
                          </small>
                        </div>
                        <div className="ms-auto text-end">
                          <small className={selectedConversation?.id === conversation.id ? 'text-white' : 'text-muted'}>
                            {conversation.lastMessageTime}
                          </small>
                          {conversation.unreadCount > 0 && (
                            <span className="badge bg-white text-primary rounded-pill ms-2">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-8">
            <div className="card border-0 shadow-sm h-100">
              {selectedConversation ? (
                <>
                  <div className="card-header bg-white border-0 d-flex align-items-center">
                    <img src={selectedConversation.avatar} alt="User" className="rounded-circle me-3" width="50" height="50" />
                    <div>
                      <h5 className="mb-0 fw-bold">{selectedConversation.name}</h5>
                      <small className="text-muted">Online now</small>
                    </div>
                    <div className="ms-auto">
                      <button className="btn btn-outline-secondary btn-sm me-2">
                        <i className="fas fa-phone"></i>
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="fas fa-video"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body chat-container" ref={chatContainerRef}>
                    {selectedConversation.messages.map((message) => (
                      <div key={message.id} className={`chat-message ${message.isOwn ? 'sent' : 'received'}`}>
                        <div className="message-content">
                          <p className="mb-1">{message.text}</p>
                          <small className="text-muted">{message.timestamp}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="card-footer bg-white border-0">
                    <div className="input-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Type your message..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <button 
                        className="btn btn-primary" 
                        type="button"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="card-body d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <i className="fas fa-comments text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                    <h5 className="text-muted">Select a conversation to start messaging</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Messages
