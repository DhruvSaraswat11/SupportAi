# 🤖 SupportAI
SupportAI is a plug-and-play AI customer support widget that can be embedded into any website using a single script tag. Businesses can configure their own knowledge base, and the chatbot responds using Google Gemini AI, eliminating the need to build a support system from scratch.

SupportAI is an embeddable AI-powered customer support chatbot that allows businesses to add an AI assistant to their website using just a single script tag.

The chatbot answers customer queries based on the business knowledge base powered by Google Gemini AI.

---

## ✨ Features

- 🤖 AI-powered customer support
- 📚 Custom business knowledge base
- 🔐 Secure authentication with Scalekit OAuth
- 🌐 Embed on any website using one script tag
- ⚡ Fast Next.js backend
- 🗄️ MongoDB database
- 💬 Floating chatbot widget
- 🎨 Easy integration
- 📱 Responsive UI

---

## 🛠 Tech Stack

- Next.js
- React
- MongoDB
- Mongoose
- Google Gemini AI
- Scalekit Authentication
- JavaScript

---

## How it Works

1. User signs in.
2. Configure business information.
3. Add business knowledge.
4. Copy the generated embed code.
5. Paste it into any website.
6. The chatbot automatically appears on the website.
7. Customer questions are answered using the configured knowledge base.

---

## Embed Example

```html
<script
src="https://your-domain/chatbot.js"
data-owner-id="YOUR_OWNER_ID">
</script>
```

That's it! 🎉

---

## Project Structure

```
app/
api/
public/
components/
lib/
model/
middleware.ts
```

---

## API

### Chat API

```
POST /api/chat
```

Body

```json
{
  "ownerId": "OWNER_ID",
  "message": "Hello"
}
```

Response

```json
"Hello! How can I help you today?"
```

---

## Future Improvements

- Conversation history
- Dashboard analytics
- Multiple chatbot themes
- File upload support
- Human handoff
- Streaming AI responses
- Multi-language support
- Voice support
- Team management
- Rate limiting

---

## Installation

```bash
git clone https://github.com/DhruvSaraswat11/SupportAi.git
```

```bash
npm install
```

Create a `.env.local`

```env
MONGO_URL=...
GEMINI_API=...
SCALEKIT_CLIENT_ID=...
SCALEKIT_CLIENT_SECRET=...
NEXT_PUBLIC_URL=http://localhost:3000
```

Run

```bash
npm run dev
```

---

## Author

Dhruv Saraswat

GitHub:
https://github.com/DhruvSaraswat11

---
