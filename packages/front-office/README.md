## Getting Started


First, install the required dependencies with `pnpm install`.

(Optional) Then add a `.env.local` file to connect to the api.
```
NEXT_PUBLIC_API_URL="http://localhost:8080"
```

Finally, you can run `pnpm run dev` and the server will start in development mode.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Storybook

To preview components without running the app, we will use Storybook.
Run `pnpm run storybook` to preview components.\
/!\ WARNING: Pay attention to the fact that Storybook only runs on LTS Node versions, so it will not work if you use the latest version of NodeJS.
If you use nvm, run `nvm install --lts` and use this version before running storybook-related commands.
