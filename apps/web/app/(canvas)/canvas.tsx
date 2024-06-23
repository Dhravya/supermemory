import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Editor, Tldraw, setUserPreferences, TLStoreWithStatus } from "tldraw";
import { createAssetFromUrl } from "./lib/createAssetUrl";
import "tldraw/tldraw.css";
import { components } from "./enabledComp";
import { twitterCardUtil } from "./twitterCard";
import createEmbedsFromUrl from "./lib/createEmbeds";
import { loadRemoteSnapshot } from "./lib/loadSnap";
import { SaveStatus } from "./savesnap";
import { getAssetUrls } from "@tldraw/assets/selfHosted";
import { memo } from "react";
import DragContext from "./lib/context";
import DropZone from "./dropComponent";

export const Canvas = memo(() => {
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const Dragref = useRef<HTMLDivElement | null>(null)

  const handleDragOver = (event: any) => {
    event.preventDefault();
    setIsDraggingOver(true);
    console.log("entere")
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
    console.log("leaver")
  };

  useEffect(() => {
    const divElement = Dragref.current;
    if (divElement) {
      divElement.addEventListener('dragover', handleDragOver);
      divElement.addEventListener('dragleave', handleDragLeave);  
    }
    return () => {
      if (divElement) {
        divElement.removeEventListener('dragover', handleDragOver);
        divElement.removeEventListener('dragleave', handleDragLeave);  
      }
    };
  }, []);

  return (
    <DragContext.Provider value={{ isDraggingOver, setIsDraggingOver }}>
    <div
      ref={Dragref}
      className="w-full h-full"
    >
      <TldrawComponent />
    </div>
    </DragContext.Provider>
  );
});

const TldrawComponent =memo(() => {
  const [storeWithStatus, setStoreWithStatus] = useState<TLStoreWithStatus>({
    status: "loading",
  });
  useEffect(() => {
    const fetchStore = async () => {
      const store = await loadRemoteSnapshot();

      setStoreWithStatus({
        store: store,
        status: "not-synced",
      });
    };

    fetchStore();
  }, []);

  const handleMount = useCallback((editor: Editor) => {
    (window as any).app = editor;
    (window as any).editor = editor;
    editor.registerExternalAssetHandler("url", createAssetFromUrl);
    editor.registerExternalContentHandler("url", ({ url, point, sources }) => {
      createEmbedsFromUrl({ url, point, sources, editor });
    });
  }, []);

  setUserPreferences({ id: "supermemory", isDarkMode: true });

  const assetUrls = getAssetUrls();
  return (
    <div className="w-full h-full">
      <Tldraw
        className="relative"
        assetUrls={assetUrls}
        components={components}
        store={storeWithStatus}
        shapeUtils={[twitterCardUtil]}
        onMount={handleMount}
      >
        <div className="absolute left-1/2 top-0 z-[1000000] flex -translate-x-1/2 gap-2 bg-[#2C3439] text-[#B3BCC5]">
          <SaveStatus />
        </div>
        <DropZone />
      </Tldraw>
    </div>
  );
})