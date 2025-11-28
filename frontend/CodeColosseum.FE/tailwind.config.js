/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
      // Shadcn UI sẽ tự thêm config vào đây sau, hiện tại để trống cũng được
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        // ... (Giữ nguyên các biến màu nếu bạn đã copy từ trước, nếu chưa thì để mặc định cũng chạy được)
  		}
  	}
  },
  plugins: [], // Nếu chưa cài tailwindcss-animate thì để mảng rỗng []
}