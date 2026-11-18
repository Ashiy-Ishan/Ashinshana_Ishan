# Ashinshana Ishan - Interactive Portfolio

A cinematic, multi-role interactive portfolio built with React and Firebase. This project features a unique experience tailored to different personas: **Personal**, **Developer**, and **Creator**, allowing visitors to explore different facets of my professional and creative journey.

## 👋 About Me

I'm **Ashinshana Ishan** (widely known as **Ashiy Ishan**), a passionate undergraduate at **Sabaragamuwa University of Sri Lanka**, pursuing a **BSc (Hons) in Computing / Information Systems**.

I am a digital builder who bridges technical systems with visual media. My focus lies at the intersection of:
- 💻 **Software Development:** Building modern, human-centric web and backend systems.
- 🎨 **UI/UX Design:** Crafting elegant and intuitive user experiences.
- 🎬 **Content Creation:** Sharing technology and creative insights through my YouTube channel and social platforms.

My philosophy is simple: **I BUILD. I CREATE. I SHARE.**

## 🚀 Live Demo
Check out the live site: [https://ashinshanaishan.me](https://ashinshanaishan.me)

## ✨ Key Features

- **Multi-Role Interaction:** Switch between Personal, Developer, and Creator views to see relevant skills, projects, and content.
- **Cinematic Hero Section:** An immersive landing experience with dynamic role-based content swapping.
- **Admin Dashboard:** A secure admin area (`#/admin`) to manage portfolio content dynamically.
- **Firebase Integration:** Powered by Firebase for Authentication, Firestore (database), and Storage.
- **Responsive Design:** Fully optimized for all device sizes with modern CSS and fluid animations.
- **Scroll Spy:** Automatic navigation highlighting as you scroll through different sections.


## Security deployment

- Publish `firestore.rules` and `storage.rules` in the Firebase project configured by the app.
- Use the same verified admin email in both rules files and `REACT_APP_ADMIN_EMAIL`.
- Set `IMAGEKIT_PRIVATE_KEY` in Vercel server environment variables and redeploy. Remove any old `REACT_APP_IMAGEKIT_PRIVATE_KEY` and rotate the key if that variable was previously used.

## Browser smoke tests

Use a current Node.js 22.x or 24.x LTS release and install Google Chrome. Both scripts use the installed Chrome. Selenium Manager downloads a matching driver on the first run, so that run may need internet access.

1. Install the locked dependencies with `npm ci`.
2. Run `npm start` in one terminal and wait for the app to compile at `http://localhost:3000`.
3. In a second terminal, run the checks you want.

   ```bash
   npm run test:playwright
   npm run test:selenium
   ```

Playwright checks the mobile Creator view, the Videos link, and whether the theme survives a reload. Selenium checks the direct Skills link, navigation to Projects, and the signed-out admin screen. The tests use fresh browser sessions and can run against the local sample data without Firebase credentials. Keep the Developer and Creator sections enabled when testing a configured instance.

Set `HEADED=1` to watch the browser, or set `BASE_URL` to test another running instance. For example, on macOS or Linux:

```bash
HEADED=1 npm run test:playwright
BASE_URL=http://localhost:4173 npm run test:selenium
```
