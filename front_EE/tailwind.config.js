/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        luxury: {
           // Olive Colors
           lightOlive: '#D3E1C5', // Light Olive (Base, 밝게 조정)
           lighterOlive: '#D3E1C5', // Lighter Olive (Highlight, 밝게 조정)
           darkerOlive: '#7D8E68', // Darker Olive (Pressed, 밝게 조정)
           neutralOlive: '#E2EDDC', // Soft Neutral Olive (Hover, 밝게 조정)
           vibrantOlive: '#B6D7AF', // Vibrant Olive (Hover, 밝게 조정)
           deepOlive: '#7D8E68', // New Darker Olive (Extra Deep, 밝게 조정)
 
           // Complementary Colors
           terracotta: '#AF726F', // Terracotta (Warm Accent, 밝게 조정)
           sageGreen: '#C8D3B7', // Sage Green (Soft Green Complement, 밝게 조정)
           goldenSand: '#E6D3B1', // Golden Sand (Warm Neutral Highlight, 밝게 조정)
           softClay: '#F0C7B3', // Soft Clay (Muted Red Accent, 밝게 조정)
           earthBrown: '#9D7B61', // Earth Brown (Deep Neutral Complement, 밝게 조정)
 
           // Neutral Accents
           mistGray: '#E4E7E3', // Mist Gray (Soft and Light Neutral, 밝게 조정)
           charcoalGray: '#5C5C5C', // Charcoal Gray (Deep Neutral Contrast, 밝게 조정)
 
           // Highlights
           paleBlush: '#F8ECE4', // Pale Blush (Soft Pinkish Highlight, 밝게 조정)
           sunbeamYellow: '#FAE9B8', // Sunbeam Yellow (Subtle Warm Highlight, 밝게 조정)
 
           
            // Burgundy Colors (Red Tones)
 lightBurgundy: '#E8A6A6', // Light Red (부드럽고 밝은 빨강)
 richBurgundy: '#D97878', // Rich Red (파스텔 톤의 짙은 빨강)
 darkBurgundy: '#B95E5E', // Dark Red (부드러운 깊은 빨강)
 
 // Mustard Colors
 lightMustard: '#F9E3A8', // Light Mustard (부드럽고 밝은 머스타드)
 richMustard: '#EACF88', // Rich Mustard (파스텔 톤의 짙은 머스타드)
 darkMustard: '#C8A866', // Dark Mustard (부드러운 깊은 머스타드)
 
   
         },
       },
     },
   },
 
  plugins: [],
};