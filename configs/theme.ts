import CSS from "csstype";

export interface ITheme {
  colors: {
    background: CSS.Property.Color;
    backdrop: CSS.Property.Color;
    confirm: CSS.Property.Color;
    cancel: CSS.Property.Color;
    placeholder: CSS.Property.Color;
    font: {
      primary: CSS.Property.Color;
      secondary: CSS.Property.Color;
      tertiary: CSS.Property.Color;
    };
  };
  sizes: {
    button: number;
    input: number;
    icon: number;
    font: {
      small: number;
      medium: number;
      large: number;
      extraLarge: number;
    };
  };
  fontFamilies: {
    regular: string;
    medium: string;
    semiBold: string;
    bold: string;
  };
  radius: {
    small: number;
    medium: number;
    large: number;
  };
  spacing: {
    margins: {
      large: number;
    };
    paddings: {
      large: number;
    };
    gaps: {
      large: number;
    };
  };
}

export const theme: ITheme = {
  colors: {
    background: "#F1F1F1",
    backdrop: "#FFFFFF",
    confirm: "#259F00",
    cancel: "#CC0000",
    placeholder: "#A1A1A1",
    font: {
      primary: "#000000",
      secondary: "#FFFFFF",
      tertiary: "#808080",
    },
  },
  sizes: {
    button: 60,
    input: 50,
    icon: 40,
    font: {
      small: 12,
      medium: 16,
      large: 20,
      extraLarge: 24,
    },
  },
  fontFamilies: {
    regular: "regular",
    medium: "medium",
    semiBold: "semiBold",
    bold: "bold",
  },
  radius: {
    small: 10,
    medium: 20,
    large: 30,
  },
  spacing: {
    margins: {
      large: 20,
    },
    paddings: {
      large: 20,
    },
    gaps: {
      large: 20,
    },
  },
};
