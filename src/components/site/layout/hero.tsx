import React from 'react'

const Hero = () => {
  return (
    <>
      <section className="relative bg-black text-white min-h-[80vh] flex flex-col items-center justify-center overflow-hidden py-16">
        {/* Background shapes (placeholder) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Add SVG or gradient shapes here if muốn giống surferseo.com hơn */}
        </div>
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Boost visibility in Google,<br />
            ChatGPT, and beyond.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Search has changed. People turn to Google, ChatGPT, and other AI chats to find answers.<br />
            Surfer gives you one workflow to make sure your content is visible in all of them.
          </p>
          <button className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow mb-8 transition">
            Get started now
          </button>
          {/* Reviews and avatars */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              {/* Star icons (placeholder) */}
              <span className="text-yellow-400 text-xl">★★★★★</span>
              <span className="ml-2 font-bold">4.8</span>
              <span className="text-gray-400 text-sm">500+ REVIEWS</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              {/* Avatars (placeholder) */}
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/40?img=1" alt="avatar" className="w-8 h-8 rounded-full border-2 border-black" />
                <img src="https://i.pravatar.cc/40?img=2" alt="avatar" className="w-8 h-8 rounded-full border-2 border-black" />
                <img src="https://i.pravatar.cc/40?img=3" alt="avatar" className="w-8 h-8 rounded-full border-2 border-black" />
                <img src="https://i.pravatar.cc/40?img=4" alt="avatar" className="w-8 h-8 rounded-full border-2 border-black" />
              </div>
              <span className="ml-3 text-gray-300 text-sm">
                150,000+ Content Creators, SEOs, Agencies, and Teams rank with Surfer every day
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Video Grid Section */}
      <section className="relative max-w-6xl mx-auto mt-8 mb-16 px-4">
        <div className="rounded-3xl border-4 border-purple-600 bg-[#18181b] p-6 md:p-10 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Surfer Explained – Your All in One SEO Content Optimization Platform
            </h2>
            <button className="text-gray-300 hover:text-white text-sm flex items-center gap-1">
              Copy link
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-2m6-9V4m0 0L9 7m3-3l3 3" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 16 video thumbnails, dùng placeholder */}
            {[...Array(16)].map((_, i) => (
              <div key={i} className="bg-black rounded-lg overflow-hidden shadow relative group cursor-pointer">
                <img
                  src={`https://placehold.co/320x180?text=Video+${i+1}`}
                  alt={`Video ${i+1}`}
                  className="w-full h-32 object-cover group-hover:opacity-80 transition"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <span className="text-white text-xs font-semibold">Video Title {i+1}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Fake video progress bar */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-white text-xs">4:42 / 4:42</span>
            <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden mx-2">
              <div className="h-full bg-red-500 w-full"></div>
            </div>
            <span className="text-white text-xs">It's up to you now!</span>
            <span className="ml-auto flex items-center gap-2">
              <span className="text-white text-lg">▶</span>
              <span className="text-white text-lg">⛶</span>
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero