import React from 'react'

const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <span className="inline-block w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
    </div>
  )
}

export default LoadingComponent