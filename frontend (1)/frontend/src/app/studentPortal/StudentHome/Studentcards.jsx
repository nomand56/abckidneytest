import { useEffect, useState } from 'react';

function Studentcards() {
  const [greeting, setGreeting] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    let greetingText = '';
    let imageSource = '';

    if (hours >= 5 && hours < 12) {
      greetingText = 'Good Morning';
      imageSource = '/female4.png'; 
    } else if (hours >= 12 && hours < 17) {
      greetingText = 'Good Afternoon';
      imageSource = '/female4.png'; 
    } else {
      greetingText = 'Good Evening';
      imageSource = '/female.png'; 
    }

    setGreeting(greetingText);
    setImageSrc(imageSource);
    setRefreshCount(refreshCount + 1);
  }, [refreshCount]);

  return (
    <div className="bg-blue-900 p-8 rounded-lg shadow-lg text-white mb-9" style={{ background: '#0e437e' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
        <div className="text-center md:text-left mb-12">
          <div className="text-4xl font-semibold">{greeting}</div>
          <span className="text-2xl font-semibold text-orange-700">Welcome To Abc Kidney</span>
          <span className="text-xl mt-4"> Keep it up and improve your results!</span>
        </div>
        <img className="w-96 h-auto" alt="" src={imageSrc} />
      </div>
    </div>
  );
}

export default Studentcards;
