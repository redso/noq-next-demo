This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Integration

### Backend Integration

First, install `roomq` library

```bash
npm install roomq
```

Create a middleware to intercept request, please refer `middleware.ts`


### Frontend Integration

Add script tag to the page, refer to `app/layout.tsx`


```jsx
<Script
    type="text/javascript"
    src="https://scripts.noq.com.hk/v2.0.7/noq-vwr.min.js?c=client-dev&cookie_key=[be_roomq_t_client-dev]"
    />
```

Then a `RoomQ` Object will be exist in window object.

## Start demo

Create a config file `.env.local`

```
ROOM_ID=
ROOM_SECRET=
ROOMQ_TICKET_ISSUER=
```


```bash
npm run dev
```