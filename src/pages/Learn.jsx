// pages/Learn.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { learnArticles } from '../data/cryptoData';

const CATEGORIES = ['All', 'Crypto basics', 'Bitcoin', 'Ethereum', 'DeFi', 'NFTs'];
const DIFFICULTIES = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];

const Learn = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All levels');
  const [search, setSearch] = useState('');

  const filtered = learnArticles.filter(article => {
    const matchCat = activeCategory === 'All' || article.category === activeCategory;
    const matchDiff = difficulty === 'All levels' || article.difficulty === difficulty;
    const matchSearch = !search || article.title.toLowerCase().includes(search.toLowerCase()) || article.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchDiff && matchSearch;
  });

  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700',
  };

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-cb-blue py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Learn the basics of crypto
          </h1>
          <p className="text-blue-200 text-lg mb-8">
            Learn how to invest safely and understand the world of cryptocurrency.
          </p>
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm focus:outline-none bg-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-cb-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            className="sm:ml-auto border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cb-blue"
          >
            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Featured Article */}
        {filtered.length > 0 && (
          <div className="bg-cb-blue-light rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <span className="text-xs font-semibold text-cb-blue uppercase tracking-wider">
                Featured · {filtered[0].category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-3">{filtered[0].title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{filtered[0].description}</p>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColor[filtered[0].difficulty]}`}>
                  {filtered[0].difficulty}
                </span>
                <span className="text-sm text-gray-500">{filtered[0].readTime}</span>
              </div>
              <button className="mt-4 text-cb-blue font-semibold text-sm hover:underline">
                Read article →
              </button>
            </div>
            <img
              src={filtered[0].image}
              alt={filtered[0].title}
              className="w-full md:w-64 h-40 object-cover rounded-2xl flex-shrink-0"
            />
          </div>
        )}

        {/* Article Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map(article => (
            <div
              key={article.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-cb-blue bg-cb-blue-light px-2.5 py-0.5 rounded-full">
                    {article.category}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[article.difficulty]}`}>
                    {article.difficulty}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug">{article.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{article.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                  <button className="text-cb-blue text-sm font-medium hover:underline">Read →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No articles match your search.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); setDifficulty('All levels'); }}
              className="text-cb-blue font-medium mt-2 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center bg-gray-50 rounded-3xl py-12 px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to start investing?</h2>
          <p className="text-gray-500 mb-6">Create a free account and start buying crypto today.</p>
          <Link to="/signup">
            <button className="btn-primary">
              Create free account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Learn;
