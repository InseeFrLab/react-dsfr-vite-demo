import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./Home";
import { Mui } from "./Mui";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { fr } from "@codegouvfr/react-dsfr";
import { GdprStoreProvider } from "@codegouvfr/react-dsfr/gdpr";
import { ConsentBanner } from '@codegouvfr/react-dsfr/ConsentBanner';
import { GlobalStyles } from "tss-react";

startReactDsfr({ "defaultColorScheme": "system", Link });

declare module "@codegouvfr/react-dsfr/spa" {
    interface RegisterLink {
        Link: typeof Link;
    }
}

declare module "@codegouvfr/react-dsfr/gdpr" {
    interface RegisterGdprServices {
        matomo: never;
    }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </React.StrictMode>
);

function Root() {

    const location = useLocation();

    return (
        <>
            <GlobalStyles
                styles={{
                    "html": {
                        //NOTE: Always show scrollbar to avoid layout shift when modals are opened
                        "overflow": "-moz-scrollbars-vertical",
                        "overflowY": "scroll"
                    }
                }}
            />
            <GdprStoreProvider>
                <ConsentBanner gdprLinkProps={{ to: "/mui" }} siteName='Next Test App' services={[
                    {
                        name: "matomo",
                        title: "Matomo",
                        description: "User tracking",
                    }
                ]} />
                <div style={{ "minHeight": "100vh", "display": "flex", "flexDirection": "column" }}>
                    <Header
                        brandTop={<>INTITULE<br />OFFICIEL</>}
                        serviceTitle="Nom du site / service"
                        homeLinkProps={{
                            "to": "/",
                            "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
                        }}
                        quickAccessItems={[headerFooterDisplayItem]}
                        navigation={[
                            {
                                "text": "Home",
                                "linkProps": {
                                    "to": "/"
                                },
                                "isActive": location.pathname === "/"
                            },
                            {
                                "text": "Mui playground",
                                "linkProps": {
                                    "to": "/mui"
                                },
                                "isActive": location.pathname === "/mui"
                            },
                            {
                                "text": "External link",
                                "linkProps": {
                                    "to": "https://example.fr"
                                },
                                "isActive": false
                            }
                        ]}
                    />
                    <div style={{
                        "flex": 1,
                        "margin": "auto",
                        "maxWidth": 1000,
                        ...fr.spacing("padding", { "topBottom": "10v" })
                    }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/mui" element={<Mui />} />
                            <Route path="*" element={<h1>404</h1>} />
                        </Routes>
                    </div>
                    <Footer
                        accessibility="fully compliant"
                        contentDescription={`
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                        eu fugiat nulla pariatur. 
                    `}
                        bottomItems={[headerFooterDisplayItem]}
                    />
                </div>
            </GdprStoreProvider>
        </>
    );

}
