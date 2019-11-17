import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Button } from "@storybook/react/demo";
import { ImageView } from "./components/ImageView";

export default { title: "Homepage" };

export const SingleImage = () => (
  <MemoryRouter initialEntries={["/images?src=test"]}>
    <ImageView />
  </MemoryRouter>
);

// export const withText = () => <Button>Hello Button</Button>;

// export const withEmoji = () => (
//   <Button>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );
