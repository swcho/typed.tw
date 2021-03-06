import React, { useEffect, useRef } from "react";

import { sample } from "./sample";
import { Tw } from "style";
import { createEditor, Editor } from "app/editor/editor";
import { Panel } from "app/panel/panel";

export const initialConfig: string =
  window.localStorage.getItem("config") || sample;

interface Props {
  config: string;
  setConfig: (config: string) => void;
}

export const Config: React.FC<Props> = (props) => {

  const { config, setConfig } = props;
  const editor = useRef<Editor | null>(null)
  const container = useRef<HTMLDivElement>(null)

  // Save config
  useEffect(() => {
    window.localStorage.setItem("config", config);
  }, [config]);

  // Init editor
  useEffect(() => {
    const element = container.current;
    if (!element) { return; }

    const options = { name: "config", language: "javascript", value: "" };
    editor.current = createEditor(element, options);
    if (!editor.current) { throw new Error("Can't create editor."); }

    editor.current.onDidChangeModelContent(() => {
      if (!editor.current) { throw new Error("Editor is not defined."); }
      setConfig(editor.current.getValue());
    });
  }, [setConfig]);

  // Update editor (on external changes only)
  useEffect(() => {
    if (!editor.current) { return; }
    if (editor.current.getValue() !== config) {
      editor.current.setValue(config);
    }
  }, [editor, config])

  return (
    <Panel title="tailwind.config.js">
      <div ref={container} className={Tw().wFull().hFull().$()} />
    </Panel>
  );
};
