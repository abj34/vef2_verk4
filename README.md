# Vefforritun 2, 2023, verkefni 4: kennsluskráar framendi

Verkefnið er framhald af verkefni 3 og snýst um að setja upp react framenda fyrir vefþjónustur á kennsluskránni okkar.

## Markmið

- Uppsetning og notkun á React með [Create React App (CRA)](https://create-react-app.dev/) eða [Next.js](https://nextjs.org/).
- Noktun á React components með props og state.
- Routing í React verkefnum.

## Vefþjónustur og gögn

Viðburði skal sækja úr vefþjónustu ykkar úr verkefni 3. Þið getið líka sótt [sýnilausn á verkefni 3](https://github.com/vefforritun/vef2-2023-v3-synilausn) (gefin út 10. mars) og sett hana upp í hýsingu.

Á forsíðu eru viðburðir frá `/events` birtir, fyrir hvern viðburð eru gögn sótt á `/events/:id`. Ekki þarf að útfæra síðuflettingu (e. paging) í viðmóti.

Grunnslóð (_base url_) á vefþjónustu skal geyma í env breytu (sjá [skjölun fyrir CRA](https://create-react-app.dev/docs/adding-custom-environment-variables/) og [skjölun fyrir NextJS](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser)).

Meðan verkefni er þróað getur verið gott að hafa vefþjónustur keyrandi _locally_, þá er viðeigandi slóð sett í env breytu, t.d. `NEXT_PUBLIC_API_BASE_URL=https://example.org/`.

## Virkni

Setja skal upp þrjár síður:

- Forsíðu sem birtir lista af deildum frá vefþjónustu (`GET /departments`), sú síða skal leyfa að útbúa nýja deild.
- Síðu fyrir deild eftir _slug_ (`GET /departments/:slug`), sú síða skal leyfa að eyða deild.
- Síðu fyrir áfanga deildar (`GET /departments/:slug/courses`), sú síða skal leyfa að bæta við áfanga.

Ef CRA er notað skal nota [react router](https://reactrouter.com/en/main) til að setja upp routing og nota það til að viðhalda stöðu á milli síðna. Ef Next.js er notað skal nota `pages/` möppu fyrir routing.

Búa skal til a.m.k. fimm componenta sem halda utan um viðeigandi stöðu og taka við gögnum gegnum props:

- `Layout` component sem heldur utan um header, efni og footer á síðu.
- `Departments` component sem birtir lista af deildum.
- `Department` component sem birtir staka deild og leyfir að eyða henni.
- `Courses` component sem birtir áfanga.
- Form componenta: `Form`, `Input` og `Button`. Ekki þarf að útbúa sértæka componenta fyrir lengri texta eða tölur fyrir einingar.

Ef villur koma upp frá vefþjónustu skal birta þær, _ekki_ þarf að útfæra neina auka validation í framendanum.

## Viðmót

Útbúa skal einfalt viðmót sem uppfyllir kröfur um virkni. Leyfilegt er að endurnýta viðmót úr verkefni 1 með viðbótum.

## Tæki, tól og test

Setja skal upp verkefni með `create react app` (CRA) eða NextJS.

Setja skal upp `eslint`. Engar villur skulu vera til staðar.

## Bónus

Bæta við að hægt sé að breyta upplýsingum um deild.

Bæta við að hægt sé að eyða áfanga og breyta áfanga.

## GitHub og hýsing

Setja skal upp vefinn á Netlify, Vercel, Render, Railway eða Heroku (ath að uppsetning á Heroku mun kosta) tengt við vefþjónustur í _annari_ uppsetningu.

## Mat

- 30% — Forsíða með lista af deildum og möguleiki á að bæta við deild.
- 20% — Deildarsíða með möguleika á að eyða.
- 20% — Áfgangasíða með möguleika á að bæta við áfanga.
- 10% — Viðmót.
- 10% — Tæki, tól og test.
- 10% — GitHub og hýsing.
- 5% — _Bónus_, breyta upplýsingum um deild.
- 10% — _Bónus_, eyða áfanga og breyta áfang.

## Sett fyrir

Verkefni sett fyrir í fyrirlestri mánudaginn 6. mars 2023.

## Skil

Skila skal í Canvas í seinasta lagi fyrir lok dags fimmtudaginn 23. mars 2023.

Skil skulu innihalda:

- Slóð á verkefni keyrandi í hýsingu.
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - `MarzukIngi`
  - `ofurtumi`
  - `osk`

---

> Útgáfa 0.1

| Útgáfa | Breyting      |
| ------ | ------------- |
| 0.1    | Fyrsta útgáfa |





-------------------------------------




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
