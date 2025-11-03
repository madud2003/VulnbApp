export default function AuthPage() {
  // Data (unchanged)
  const userName = "Jane Doe";
  const learningProgress = 40;

  const handleGoToLearning = () => {
    window.location.href = "/learning/level1"; 
  };

  return (
    // Background: Deep, cool near-black (matches screenshot)
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#161924] p-6">
      
      {/* Card: Softer, lighter blue-gray with more pronounced glow */}
      <div className="bg-[#23263a] rounded-2xl shadow-[0_4px_40px_4px_rgba(62,87,255,0.18)] p-10 max-w-md w-full flex flex-col items-center gap-6 border-[1.5px] border-[#4353b9]/20">
        
        {/* Title: Big, bold, slightly lighter indigo */}
        <h1 className="text-[2rem] font-extrabold text-[#8e9cff] mt-2 leading-tight text-center">
          Welcome, {userName}!
        </h1>
        
        {/* Description: Centered, soft gray, smaller */}
        <p className="text-[#c3c8e0] text-center text-base font-medium mb-4">
          This is your dashboard. Here you can track your progress, access labs, and more.
        </p>
        
        {/* Progress Bar & Label */}
        <div className="w-full">
          <div className="flex justify-between text-sm mb-1 text-[#8893e5] font-semibold">
            <span>Learning Progress</span>
            <span>{learningProgress}%</span>
          </div>
          <div className="w-full bg-[#202233] rounded-full h-3">
            <div 
              className="bg-[#5b65f6] h-3 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${learningProgress}%` }}
              role="progressbar"
              aria-valuenow={learningProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
        
        {/* Button: Lighter, glowy, bolder */}
        <button
          onClick={handleGoToLearning}
          className="w-full bg-[#656aff] text-white py-3 rounded-xl font-bold text-lg shadow-xl shadow-[#636cff]/40 hover:bg-[#5e62e6] transition hover:scale-[1.02] active:scale-95"
        >
          Go to Learning
        </button>
        
      </div>
    </div>
  );
}
