import { Typography, Link } from "@mui/material";
import React from "react";
import ReactMarkdown, { MarkdownToJSX } from "markdown-to-jsx";

export interface MarkdownProps {
  content: string;
  options?: MarkdownToJSX.Options;
}

export const markdownDefaultOptions: MarkdownToJSX.Options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h5",
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: "h6" } },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: "subtitle1" },
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: "caption", paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    li: {
      component: "li",
    },
  },
};

export const Markdown = ({ content, options = markdownDefaultOptions }: MarkdownProps) => {
  return <ReactMarkdown options={options}>{content}</ReactMarkdown>;
};
