import { EditorBubble,EditorCommand,EditorCommandEmpty,EditorCommandItem,EditorCommandList } from 'novel'
import React, { useState } from 'react'
import { NodeSelector } from './selectors/node-selector'
import { Separator } from './ui/separator'
import { LinkSelector } from './selectors/link-selector'
import { TextButtons } from './selectors/text-buttons'
import { ColorSelector } from './selectors/color-selector'
import { BgColorSelector } from './selectors/bgcolor-selector'
import { AlignmentSelector } from './selectors/alignment-selector'
import SuperscriptSelector from './selectors/superscriptSelector'
import { suggestionItems } from './slash-command'
import AiGenerate from './aithigy'

export default function EditorTools() {
  return (<><BubbleMenu /><SlashMenu /><AiGenerate /></>)
}

function SlashMenu(){
  return (
    <EditorCommand className="z-50 h-auto max-h-[330px] min-w-[20rem] overflow-y-auto rounded-sm bg-[#1F2428]  shadow-md transition-all">
    <EditorCommandEmpty className="px-4 text-lg text-muted-foreground">No results</EditorCommandEmpty>
    <EditorCommandList>
      {suggestionItems.map((item) => (
        <EditorCommandItem
          value={item.title}
          onCommand={(val) => item.command && item.command(val)}
          className="flex w-full items-center space-x-4 rounded-md px-4 py-3 text-left text-sm hover:bg-accent aria-selected:bg-[#21303D] group/command"
          key={item.title}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#2D343A] group-aria-selected/command:bg-[#369DFD33]">
            {item.icon}
          </div>
          <div>
            <p className="font-medium group-aria-selected/command:text-[#369DFD]">{item.title}</p>
            <p className="text-xs text-muted-foreground group-aria-selected/command:text-[#369DFDB2]">{item.description}</p>
          </div>
        </EditorCommandItem>
      ))}
    </EditorCommandList>
  </EditorCommand>
  )
}

function BubbleMenu(){
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openBgColor, setOpenBgColor] = useState(false);
  const [openAlignment, setOpenAlignment] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  return (
    <EditorBubble
      className="flex w-fit max-w-[90vw] overflow-hidden bg-[#1F2428] text-white rounded "
    >
      <NodeSelector open={openNode} onOpenChange={setOpenNode} />
      <Separator orientation="vertical" />

      <LinkSelector open={openLink} onOpenChange={setOpenLink} />
      <Separator orientation="vertical" />
      <TextButtons />
      <Separator orientation="vertical" />
      <ColorSelector open={openColor} onOpenChange={setOpenColor} />
      <Separator orientation="vertical" />
      <BgColorSelector open={openBgColor} onOpenChange={setOpenBgColor} />
      <Separator orientation="vertical" />
      <AlignmentSelector open={openAlignment} onOpenChange={setOpenAlignment} />
      <Separator orientation="vertical" />
      <SuperscriptSelector />
    </EditorBubble>
  )
}
