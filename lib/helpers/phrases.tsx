const phrases = [
  "Daily discovery of new knowledge empowers you!",
  "Strengthen your mind through daily content exploration.",
  "Becoming stronger starts with daily learning and discovery.",
  "Every day's a chance to grow stronger through new knowledge.",
  "Consistent learning is the key to becoming more resilient.",
  "Daily intellectual exploration fortifies you.",
  "Learning something new every day boosts your strength.",
  "Your strength multiplies with each day of new discoveries.",
  "Each day of learning adds to your inner strength.",
  "Continuous learning is your path to empowerment.",
  "Personal growth begins with daily acts of learning.",
  "Elevate your mind every day through fresh discoveries.",
  "Your future is shaped by what you learn today.",
  "Empower your tomorrows through today's learning.",
  "Today's learning shapes tomorrow's achievements.",
  "Elevate your skillset with continual learning.",
  "A day without learning is a day without growth.",
  "Your best future starts with learning today.",
  "Ignite your passion for knowledge each day.",
  "Daily learning is your step-ladder to greatness.",
  "Challenge yourself daily to learn and grow.",
  "Empower your dreams through daily learning.",
  "Fuel your ambitions with daily wisdom.",
  "Your greatness starts with today's learning.",
]

export default function getPhrase() {
  const randomIndex = Math.floor(Math.random() * phrases.length)
  return phrases[randomIndex]
}
