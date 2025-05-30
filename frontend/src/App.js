import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [gameState, setGameState] = useState({
    company: 'TechCorp Industries',
    quarter: 1,
    year: 2025,
    revenue: 10000000,
    marketShare: 15,
    cashFlow: 5000000,
    employeeSatisfaction: 75,
    reputation: 80,
    decisions: [],
    score: 0
  });
  const [currentScenario, setCurrentScenario] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [teams, setTeams] = useState([]);

  const scenarios = [
    {
      id: 1,
      title: "Market Disruption Alert",
      description: "A new competitor has entered your market with revolutionary AI technology, offering similar services at 30% lower prices. Early market reports show they're gaining 2% market share per month. Your board is demanding immediate action.",
      image: "https://images.unsplash.com/photo-1632137366039-ba08c5ed24d3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBzdHJhdGVneXxlbnwwfHx8Ymx1ZXwxNzQ4NTgxMjk3fDA&ixlib=rb-4.1.0&q=85",
      options: [
        {
          text: "Launch aggressive price war - match their pricing immediately",
          consequences: { revenue: -15, marketShare: +3, cashFlow: -25, reputation: -5, score: 15 }
        },
        {
          text: "Invest heavily in R&D to develop superior technology",
          consequences: { revenue: -10, marketShare: -2, cashFlow: -20, employeeSatisfaction: +10, reputation: +15, score: 25 }
        },
        {
          text: "Focus on premium market segment with enhanced service",
          consequences: { revenue: +5, marketShare: -1, cashFlow: +10, reputation: +20, score: 30 }
        },
        {
          text: "Form strategic partnership with the competitor",
          consequences: { revenue: +10, marketShare: +5, cashFlow: +5, reputation: +10, score: 35 }
        }
      ]
    },
    {
      id: 2,
      title: "Talent Crisis",
      description: "Your top 3 engineering teams (30% of technical staff) have received lucrative offers from tech giants. Industry reports suggest this is part of a coordinated talent acquisition strategy. Losing them would delay your flagship product by 8 months.",
      image: "https://images.pexels.com/photos/7616608/pexels-photo-7616608.jpeg",
      options: [
        {
          text: "Counter-offer with 40% salary increases and equity packages",
          consequences: { revenue: -5, cashFlow: -15, employeeSatisfaction: +20, reputation: +5, score: 20 }
        },
        {
          text: "Let them go and hire fresh talent from universities",
          consequences: { revenue: -20, marketShare: -3, employeeSatisfaction: -10, cashFlow: +5, score: 10 }
        },
        {
          text: "Restructure teams and offer leadership positions to remaining staff",
          consequences: { revenue: -10, employeeSatisfaction: +15, reputation: +10, score: 25 }
        },
        {
          text: "Outsource development to maintain timeline and reduce dependency",
          consequences: { revenue: -8, cashFlow: -10, reputation: -5, score: 15 }
        }
      ]
    },
    {
      id: 3,
      title: "Regulatory Storm",
      description: "New government regulations require extensive data privacy compliance within 6 months. Non-compliance results in $50M fines and market ban. Compliance costs are estimated at $20M and will require significant system overhaul.",
      image: "https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljc3xlbnwwfHx8Ymx1ZXwxNzQ4NTgxMzEwfDA&ixlib=rb-4.1.0&q=85",
      options: [
        {
          text: "Immediate full compliance - hire top law firms and consultants",
          consequences: { revenue: -15, cashFlow: -30, reputation: +25, score: 30 }
        },
        {
          text: "Minimal compliance and lobby for regulation changes",
          consequences: { revenue: -5, cashFlow: -10, reputation: -15, score: 10 }
        },
        {
          text: "Pivot business model to avoid regulatory scope",
          consequences: { revenue: -25, marketShare: -5, reputation: +10, score: 20 }
        },
        {
          text: "Form industry coalition to negotiate compliance timeline extension",
          consequences: { revenue: -10, cashFlow: -15, reputation: +15, score: 35 }
        }
      ]
    }
  ];

  const handleDecision = (option) => {
    const newGameState = { ...gameState };
    
    // Apply consequences
    Object.keys(option.consequences).forEach(key => {
      if (key === 'score') {
        newGameState.score += option.consequences[key];
      } else {
        newGameState[key] += option.consequences[key];
      }
    });

    // Add decision to history
    newGameState.decisions.push({
      scenario: currentScenario.title,
      decision: option.text,
      quarter: newGameState.quarter,
      consequences: option.consequences
    });

    // Advance quarter
    newGameState.quarter += 1;
    if (newGameState.quarter > 4) {
      newGameState.quarter = 1;
      newGameState.year += 1;
    }

    setGameState(newGameState);
    setCurrentScenario(null);
    
    // Auto-generate next scenario after delay
    setTimeout(() => {
      const nextScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      setCurrentScenario(nextScenario);
    }, 2000);
  };

  const startGame = () => {
    if (playerName.trim()) {
      setCurrentScreen('game');
      const firstScenario = scenarios[0];
      setCurrentScenario(firstScenario);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPerformanceLevel = (score) => {
    if (score >= 150) return { level: "Strategic Genius", color: "text-green-600" };
    if (score >= 100) return { level: "Exceptional Leader", color: "text-blue-600" };
    if (score >= 75) return { level: "Strong Performer", color: "text-purple-600" };
    if (score >= 50) return { level: "Competent Manager", color: "text-yellow-600" };
    return { level: "Needs Development", color: "text-red-600" };
  };

  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/418285/pexels-photo-418285.jpeg')`
            }}
          ></div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 rounded-full mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h1 className="text-6xl font-bold text-white mb-4">Corporate Strategy Master</h1>
              <p className="text-xl text-blue-200 mb-8">Premium Business Simulation & Training Platform</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-6">Enterprise Training Solution</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Dynamic Scenarios</h3>
                  <p className="text-blue-200 text-sm">Real-world business challenges with multiple strategic paths</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Advanced Analytics</h3>
                  <p className="text-blue-200 text-sm">Comprehensive performance tracking and decision analysis</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Team Competition</h3>
                  <p className="text-blue-200 text-sm">Multiplayer mode for collaborative leadership training</p>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your name or team name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-6 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Begin Strategic Simulation
                </button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-blue-200 text-sm mb-2">Premium Corporate Training Solution</p>
              <p className="text-white font-semibold">Enterprise License: $5,000</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      {/* Header Dashboard */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{gameState.company}</h1>
              <p className="text-blue-200">Q{gameState.quarter} {gameState.year} • CEO: {playerName}</p>
            </div>
            <div className={`text-right ${getPerformanceLevel(gameState.score).color}`}>
              <p className="text-sm text-blue-200">Performance Level</p>
              <p className="text-lg font-bold">{getPerformanceLevel(gameState.score).level}</p>
              <p className="text-2xl font-bold text-white">Score: {gameState.score}</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-600/30 rounded-lg p-4 text-center">
              <p className="text-blue-200 text-sm">Revenue</p>
              <p className="text-white font-bold text-lg">{formatCurrency(gameState.revenue)}</p>
            </div>
            <div className="bg-green-600/30 rounded-lg p-4 text-center">
              <p className="text-green-200 text-sm">Market Share</p>
              <p className="text-white font-bold text-lg">{gameState.marketShare}%</p>
            </div>
            <div className="bg-purple-600/30 rounded-lg p-4 text-center">
              <p className="text-purple-200 text-sm">Cash Flow</p>
              <p className="text-white font-bold text-lg">{formatCurrency(gameState.cashFlow)}</p>
            </div>
            <div className="bg-yellow-600/30 rounded-lg p-4 text-center">
              <p className="text-yellow-200 text-sm">Employee Satisfaction</p>
              <p className="text-white font-bold text-lg">{gameState.employeeSatisfaction}%</p>
            </div>
            <div className="bg-red-600/30 rounded-lg p-4 text-center">
              <p className="text-red-200 text-sm">Reputation</p>
              <p className="text-white font-bold text-lg">{gameState.reputation}%</p>
            </div>
          </div>
        </div>

        {/* Current Scenario */}
        {currentScenario && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                <img 
                  src={currentScenario.image} 
                  alt="Scenario" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="lg:w-2/3">
                <h2 className="text-2xl font-bold text-white mb-4">{currentScenario.title}</h2>
                <p className="text-blue-200 mb-6 leading-relaxed">{currentScenario.description}</p>
                
                <div className="space-y-3">
                  {currentScenario.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleDecision(option)}
                      className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-4 transition-all duration-200 hover:border-blue-400"
                    >
                      <p className="text-white font-medium">{option.text}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(option.consequences).map(([key, value]) => (
                          <span
                            key={key}
                            className={`text-xs px-2 py-1 rounded-full ${
                              value > 0 ? 'bg-green-600/30 text-green-200' : 'bg-red-600/30 text-red-200'
                            }`}
                          >
                            {key}: {value > 0 ? '+' : ''}{value}{key === 'revenue' || key === 'cashFlow' ? '%' : key === 'score' ? 'pts' : '%'}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Decision History */}
        {gameState.decisions.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Decision History</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {gameState.decisions.slice(-5).reverse().map((decision, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">{decision.scenario}</p>
                      <p className="text-blue-200 text-sm mt-1">{decision.decision}</p>
                    </div>
                    <span className="text-blue-300 text-sm">Q{decision.quarter}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;