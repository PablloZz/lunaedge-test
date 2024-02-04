import * as React from "react";
import { type Preview } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/blocks";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <Description />
            <Stories />
          </>
        );
      },
    },
  },
};

export default preview;
