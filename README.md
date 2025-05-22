# SkillSwap

**SkillSwap** is a Web3-based peer-to-peer service exchange powered by the `$SKILL` token. Users can list their digital services (e.g. design, code reviews, copywriting), receive requests, and get paid in utility tokens while earning on-chain reputation and NFTs as proof-of-work.

## Features

- Mobile-first UI with swipeable service cards
- Service listing with title, description, price, and background image
- Animated transitions between service cards
- "Order" button with a modal form
- Gradient background for enhanced aesthetics
- Built with Next.js, React, and Framer Motion
- CSS Modules for scoped styles

## Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: CSS Modules
- **Language**: TypeScript
- **Web3 (planned)**: WalletConnect, Solidity smart contracts, IPFS

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/SkillSwapCode/SkillSwap-.git
cd SkillSwap-
```
2. **Install dependencies**

```bash
npm i
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open in browser**

http://localhost:3000

## Folder Structure

```
/api
  └── services
  └── upload
/components
  └── ServiceCard.tsx
  └── ServiceForm.tsx
  └── ServiceContainer.tsx
/types
  └── Service.ts
/styles
  └── ServiceCard.module.css
  └── ServiceForm.module.css
  └── ServiceContainer.module.css
/pages
  └── create
```