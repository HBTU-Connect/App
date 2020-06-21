import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import isHotkey from 'is-hotkey'
import { Editable, withReact, ReactEditor, useSlate, Slate, useFocused, useSelected, useEditor } from 'slate-react'
import { Editor, Transforms, createEditor, Node  } from 'slate'
import { withHistory } from 'slate-history'
import { IconButton } from '@material-ui/core'
import isUrl from 'is-url'
import { Code as CodeIcon,
    FormatBold as FormatBoldIcon,
    FormatItalic as FormatItalicIcon,
    FormatUnderlined as FormatUnderlinedIcon,
    FormatListBulleted as FormatListBulletedIcon,
    FormatListNumbered as FormatListNumberedIcon,
    FormatQuote as FormatQuoteIcon, 
    PlayCircleOutline as PlayCircleOutlineIcon,
    FormatIndentIncrease as FormatIndentIncreaseIcon,
    ViewDay as ViewDayIcon,
    Image as ImageIcon,
    FormatAlignCenter as FormatAlignCenterIcon,
    ClosedCaption as ClosedCaptionIcon,
    ExpandMore as ExpandMoreIcon, 
    InsertLink as InsertLinkIcon
} from '@material-ui/icons'

import { Range } from 'slate'


const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

let placeholder = ['', 'Tell your story...']

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body)
}

const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')
        console.log(mime)
        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const withEmbeds = editor => {
  const { isVoid } = editor
  editor.isVoid = element => (element.type === 'video' ? true : isVoid(element))
  return editor
}

const withCodeBlockVoids = editor => {
  const { isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'code_block' ? true : isVoid(element)
  }

  return editor
}

const withEditableVoids = editor => {
  const { isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'editable-void' ? true : isVoid(element)
  }

  return editor
}

const withLinks = editor => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const withLayout = editor => {
    const { normalizeNode } = editor
    
  
    editor.normalizeNode = ([node, path]) => {
      if (path.length === 0) {
        if (editor.children.length < 1) {
          const title = { type: 'title', children: [{ text: 'Untitled' }] }
          Transforms.insertNodes(editor, title, { at: path.concat(0) })
        }
  
        if (editor.children.length < 2) {
          const paragraph = { type: 'paragraph', children: [{ text: ''},{ text: '', value: 'Tell your Story...'}] }
          Transforms.insertNodes(editor, paragraph, { at: path.concat(1) })
        }
  
        for (const [child, childPath] of Node.children(editor, path)) {
          let type = childPath[0] === 0 ? 'title' : 'paragraph'

          if ( child.type !== type) {
            if(child.type !== 'title' && childPath[0] === 0){
              Transforms.setNodes(editor, { type }, { at: childPath })
            }
            if(child.type === 'title'){
              Transforms.setNodes(editor, { type }, { at: childPath })
            }
            if(child.type !== 'paragraph' && child.type !== 'title'){
              type = child.type
              Transforms.setNodes(editor, { type }, { at: childPath })
            }
            if(child.type === 'fig-caption' && childPath[0] === 1){
              type = 'paragraph'
              Transforms.setNodes(editor, { type }, { at: childPath })
            }
            // if( child.type === 'p-with-placeholder'){
            //   type = 'paragraph'
            //   Transforms.setNodes(editor, { type }, { at: childPath })
            // }
          }
        }
      }
  
      return normalizeNode([node, path])
    }
  
    return editor
  }

const TextEditor = () => {
  const [value, setValue] = useState(initialValue)
  const [ height, setHeight ] = useState(0)
  const [ position, setPosition ] = useState(0)
  const [ display, setDisplay ] = useState(false)
  const [ expand, setExpand ] = useState(false)
  const renderElement = useCallback(props => <Element {...props} setPosition={setPosition} setDisplay={setDisplay}/>, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withLinks(withCodeBlockVoids(withEditableVoids(withImages(withEmbeds(withLayout(withHistory(withReact(createEditor())))))))), [])
  const header = useRef(null)
  const textEditor = useRef(null)

  useEffect(() => {
    header.current.style.transform = `translateY(${position}px)`
    if(!display){
      header.current.style.visibility = 'hidden'
    }
    else{
      header.current.style.visibility = 'visible'
    }
  }, [position, display])

  useEffect(() => {
    textEditor.current.scrollTo(0, height)
  }, [height])

  const onChange = (v) =>{
    setValue(v)
  }

  const scroll = () => {
    const doc = document.getElementsByClassName('text-editor')[0]
    const docHeight = doc.scrollHeight
    setHeight(docHeight + 200)
  }
  return (
      <div className='body-container'>
        <Slate editor={editor} value={value} onChange={v => onChange(v)} >
          <div ref={textEditor} className='text-editor' onKeyDown={(e) => {if(e.keyCode === 13)scroll()}}>
            <div className='text-editor__header' ref={header}>
              <InsertButton expand={expand} setExpand={setExpand} title='Insert Image' size='medium' format='image' icon={<ImageIcon fontSize='large'/>}/>
              <InsertButton expand={expand} setExpand={setExpand} title='Insert Video' size='medium'  format='video' icon={<PlayCircleOutlineIcon fontSize='large'/>} />
              <InsertButton expand={expand} setExpand={setExpand} title='Insert Code Block' size='medium' format="code_block" icon={<CodeIcon fontSize='large'/>} />
              {!expand && <IconButton size='medium' onClick={() => setExpand(true)}><ExpandMoreIcon size='large' /></IconButton>}
              {expand && <>
              <BlockButton expand={expand} setExpand={setExpand} title='Insert Ordered List' size='medium' format="numbered-list" icon={<FormatListNumberedIcon fontSize='large'/>} />
              <BlockButton expand={expand} setExpand={setExpand} title='Insert Unordered List' size='medium' format="bulleted-list" icon={<FormatListBulletedIcon fontSize='large'/>} />
              <BlockButton expand={expand} setExpand={setExpand} title='Insert Quote' size='medium' format="block-quote" icon={<FormatQuoteIcon fontSize='large'/> } /> 
              </>} 
            </div>
            <HoveringToolbar />
            <Editable
              renderElement={renderElement}
              className='text-editor__editor'
              renderLeaf={renderLeaf}
              placeholder="Tell you story..."
              spellCheck
              autoFocus
              tabIndex={0}
              onKeyDown={event => {
                
              for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event)) {
                  event.preventDefault()
                  const mark = HOTKEYS[hotkey]
                  toggleMark(editor, mark)
                  }
              }
              }}         
            />
          </div>
        </Slate>
    </div>
  )
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = (props) => {
  const selected = useSelected()
  const focused = useFocused()
  const editor = useEditor()
  const { attributes, children, element, setPosition, setDisplay } = props
  const input = useRef(null)

  useEffect(() => {
    if(selected && focused){
      if(attributes.ref.current.offsetTop < 200)
        setPosition(153)
      else
        setPosition(attributes.ref.current.offsetTop-100)
      if(element.type === 'video' || element.type === 'image' || element.type === 'code_block' || element.type === 'editable-void' || element.type === 'title'){
        setDisplay(false)
      }else{
        setDisplay(true)
      }
      if(element.type === 'editable-void'){
        input.current.focus()
      }
      if(editor.children[editor.selection.anchor.path[0] -1] && editor.children[editor.selection.anchor.path[0] -1].type === 'fig-caption' ){
        const type = 'paragraph'
        Transforms.setNodes(editor, { type }, { hanging: true })
      }

    }
  })
  
  if(placeholder[editor.children.length-1]){
    var addRule = (function(style){
      var sheet = document.head.appendChild(style).sheet;
      return function(selector, css){
          var propText = Object.keys(css).map(function(p){
              return p+":"+css[p]
          }).join(";");
          sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
      }
    })(document.createElement("style"));

      addRule(`p.p-with-placeholder${editor.children.length -1}:before`, {
          position: "absolute",
          top: "0",
          left: "0",
          cursor: 'text',
          color: 'rgb(197, 197, 197)',
          content: `'${placeholder[editor.children.length -1]}'`
      });
  }

  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h2 {...attributes}>{children}</h2>
    case 'heading-two':
      return <h3 {...attributes}>{children}</h3>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'title':
      return <h1 className={ `h1-title ${!element.children[0].text ? 'title-with-placeholder': null} ${(focused && selected ? 'title-active': null)}`} {...attributes}>{children}</h1>
    case 'video':
      return <VideoElement {...props} />
    case 'image':
      return <ImageElement {...props} />
    case 'editable-void':
      return <EditableVoidElement {...props} input={input} />
    case 'code_block':
      return <CodeNode {...props} />
    case 'fig-caption':
      return <figcaption {...attributes} >{children}</figcaption>
    case 'link':
      return (
        <a {...attributes} title={element.url} href={element.url}>
          {children}
        </a>
      )
    default:
      return(<p {...attributes} className={!element.children[0].text && placeholder[editor.children.length -1] ? `p-with-placeholder${editor.children.length -1}`: 'p'}>
        {children}
        </p>)  
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon, size, setExpand, title }) => {
  const editor = useSlate()
  // const { normalizeNode } = editor
  const active=isBlockActive(editor, format)
  return (
    <IconButton
      size={size} 
      style={{ marginLeft: '.2rem'}}
      className={active? 'active' : null}
      title={title? title : null}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
        if(setExpand)setExpand(false)
      }}
    >
      {icon}
    </IconButton>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  const active=isMarkActive(editor, format)
  return (
    <IconButton
      size='small'
      className={active? 'active' : null}
      style={{ marginLeft: '.2rem'}}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {icon}
    </IconButton>
  )
}

const InsertButton = ({format, icon, setExpand, title}) => {
  const editor = useEditor()
  return (
    <IconButton
      title={title? title : null}
      onMouseDown={event => {
        event.preventDefault()
        insertEditableVoid(editor, format)
        setExpand(false)
      }}
    >
      {icon}
    </IconButton>
  )
}

const HoveringToolbar = () => {
  const [ addLink, setAddLink ] = useState(false)
  const [ value, setValue ] =useState('')
  const [ savedSel, setSavedSel ] = useState(null)

  const ref = useRef()
  const inputel = useRef(null)
  const button = useRef(null)
  const editor = useSlate()
  const peditor = useEditor()
  let { selection } = editor
  // let saveSelection, restoreSelection, savedSel;
  // if(selection && ReactEditor.isFocused(editor) && Editor.string(editor, selection) !== ''){
  //   setSelectedText(selection)
  //   console.log(selectedText)
  // }
  // else{
  //   console.log('not selected')
  // }

  const saveSelection = () => {
    if(window.getSelection){
      var sel = window.getSelection(), ranges = [];
        if (sel.rangeCount) {
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                ranges.push(sel.getRangeAt(i));
            }
        }
        return ranges;
    }
    else if(document.selection && document.selection.createRange){
      var sel = document.selection;
        return (sel.type != "None") ? sel.createRange() : null;
    }
  }

  const restoreSelection = (savedSelection) => {
    if(window.getSelection){
      var sel = window.getSelection();
            sel.removeAllRanges();
            for (var i = 0, len = savedSelection.length; i < len; ++i) {
                sel.addRange(savedSelection[i]);
            }
            console.log('done')
    }
    else if(document.selection && document.selection.createRange){
      if (savedSelection) {
        savedSelection.select();
      }
    }
  }

  useEffect(() => {
    if(!addLink){
      var specialDiv = button.current

      specialDiv.onmousedown = function() {
        console.log('clicked')
        const temp = saveSelection()
        setSavedSel(temp)
        console.log('yes')
          // console.log(savedSel)
      }
    }

    const el = ref.current

    if (!el) {
      return
    }
    if(!addLink){
      if (
        !selection ||
        !ReactEditor.isFocused(editor) ||
        Range.isCollapsed(selection) ||
        Editor.string(editor, selection) === ''
      ) {
        el.removeAttribute('style')
        return
      }

      const domSelection = window.getSelection()
      const domRange = domSelection.getRangeAt(0)
      const rect = domRange.getBoundingClientRect()
      el.style.opacity = 1
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
      el.style.left = `${rect.left +
        window.pageXOffset -
        el.offsetWidth / 2 +
        rect.width / 2}px`
    }
  })

  return (
    <Portal>
      <div
        ref={ref}
        className='text-editor__toolbar'
      >
         <>
        {!addLink &&<> 
        <div className='text-editor__toolbar-mark-button'>
          <MarkButton format="bold" icon={<FormatBoldIcon fontSize='large'/>} />
          <MarkButton format="italic" icon={<FormatItalicIcon fontSize='large'/>} />
          <MarkButton format="underlined" icon={<FormatUnderlinedIcon fontSize='large'/>} />
        </div>
        <div className='text-editor__toolbar-mark-button'>
          <BlockButton size='small' format="heading-one" icon={<span style={{ padding: '3px', fontSize: '1.8rem', fontWeight: '600'}}>T</span>} />
          <BlockButton size='small' format="heading-two" icon={<span style={{ padding: '3px', fontSize: '1.4rem'}}>T</span>} />
        </div>
        <div className='text-editor__toolbar-block-button'>
          <IconButton ref={button} size='small' onClick={() => setAddLink(true)} ><InsertLinkIcon fontSize='large' /> </IconButton>
        </div>
        </>}
        {addLink && <input
          ref={inputel}
          type='text'
          placeholder='Paste or type a link...'
          autoFocus
          spellCheck='false'
          autoCorrect='off'
          autoComplete='off'
          autoCapitalize='off'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onMouseDown={(e) => {e.stopPropagation(); console.log('input clicked') }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if(e.keyCode === 13){
              e.preventDefault()
              // ReactEditor.focus(peditor)
              console.log(savedSel)
              restoreSelection(savedSel)
              if(value){
                setTimeout(() => {
                  insertLink(editor, value)
                },100)
              }
              setAddLink(false)
              setValue('')
              // setSelectedText(null)
              
              
            }
          }}
        />}
        </>
        
      </div>
    </Portal>
  )
}

const EmbedMenu = ({className, setClassName, caption, setCaption}) => {
  const ref = useRef()
  return(
      <div id='embed-menu' className='embed-menu' ref={ref} >
        <IconButton size='medium' onClick={()=> setClassName('left-aligned')}>
          <FormatIndentIncreaseIcon fontSize='large'  style={className === 'left-aligned' ? { color: 'green'} :{ color: 'white'}}/>
        </IconButton>
        <IconButton size='medium' onClick={()=> setClassName('center-aligned')}>
          <ViewDayIcon fontSize='large'   style={className === 'center-aligned' ? { color: 'green'} :{ color: 'white'}}/>
        </IconButton>
        <IconButton size='medium' onClick={()=> setClassName('small-center-aligned')}>
          <FormatAlignCenterIcon fontSize='large'   style={className === 'small-center-aligned' ? { color: 'green'} :{ color: 'white'}}/>
        </IconButton>
        <div></div>
        <IconButton size='medium' onClick={()=> setCaption(!caption)}>
          <ClosedCaptionIcon fontSize='large'   style={caption ? { color: 'green'} :{ color: 'white'}}/>
        </IconButton>

      </div>
  )
}

const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}
const insertVideo = (editor, url) => {
  const text = { text: '' }
  const video = { type: 'video', url, children: [text] }
  Transforms.insertNodes(editor, video)
}

const insertUrl = (editor, url) => {
  const text = { text: '' }
  const video = { type: 'url', url, children: [text] }
  Transforms.insertNodes(editor, video)
}

const insertEditableVoid = (editor, format) => {
  const text = { text: '' }
  let voidNode
  if(format === 'image' || format === 'video'){
  voidNode = { type: 'editable-void', format, children: [text] }
  }else{
    voidNode = { type: 'code_block', format, children: [text] }
  }
  if(editor.children[editor.selection.anchor.path[0]].children[0].text === ''){
    Transforms.removeNodes(editor, { hanging: true })
  }
  Transforms.insertNodes(editor, voidNode)
}
const insertParagraph = editor => {
  const text = { text: 'Add Text'}
  const voidNode = { type: 'paragraph', children: [text] }
  Transforms.insertNodes(editor, voidNode)
  ReactEditor.focus(editor)
}

const insertCaption = editor => {
  const text = { text: 'Add Caption for the embed'}
  const voidNode = { type: 'fig-caption', children: [text] }
  Transforms.insertNodes(editor, voidNode)
}

const insertParagraphText = (editor, data) => {
  const text = { text: data}
  const voidNode = { type: 'paragraph', children: [text] }
  Transforms.insertNodes(editor, voidNode)
  ReactEditor.focus(editor)
}
const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, { match: n => n.type === 'link' })
  return !!link
}

const unwrapLink = editor => {
  Transforms.unwrapNodes(editor, { match: n => n.type === 'link' })
}

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

const EditableVoidElement = ({ attributes, children, element, input}) => {
  const [inputValue, setInputValue] = useState('')
  const editor = useEditor()
  const focused = useFocused()
  const selected = useSelected()
  const format = element.format

  useEffect(()=> {
    ReactEditor.focus(editor)
  },[])

  return (
    // Need contentEditable=false or Firefox has issues with certain input types.
    <div {...attributes} contentEditable={false}>
        <input
          ref={input}
          className={`text-editor__editor-link-input`}
          type="text"
          spellCheck='false'
          autoCorrect='off'
          autoComplete='off'
          autoCapitalize='off'
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value)
          }}
          placeholder={format === 'video' ? 'Paste a YouTube, Vimeo video link here, and press Enter' : 'Paste a Image link from Unsplash here, and press Enter'}
          onKeyUp={(e) => {
            if(e.keyCode === 13){
              if(format === 'video'){
                Transforms.removeNodes(editor, { hanging: true})
                if(isVideoUrl(inputValue)){
                  insertVideo(editor, inputValue)
                  insertParagraph(editor)
                }else{
                  insertParagraphText(editor, inputValue)
                }
              }
              if(format === 'image'){
                Transforms.removeNodes(editor, { hanging: true})
                if(isImageUrl(inputValue)){
                  insertImage(editor, inputValue)
                  insertParagraph(editor)
                }else{
                  insertParagraphText(editor, inputValue)
                }
              }
            }
            if(e.keyCode === 8 && inputValue === ''){
              console.log('pressed')
              Transforms.removeNodes(editor, { hanging: true})
              ReactEditor.focus(editor)
            }
          }}
        />
        {children}
      </div>
  )
}

const RenderElement = ({ attributes, children, element }) => {
  return(
    <pre {...attributes}>
      {children}
    </pre>
  )
}
const codeInitialValue = [
  {
    type: 'pre',
    children:[{text: ''}]
  }
]

const CodeNode = ({ attributes, children, element}) =>{
  const [value, setValue] = useState(codeInitialValue)
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const renderElement = useCallback(props => <RenderElement {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const parentEditor = useEditor()

  useEffect(() => {
    ReactEditor.focus(editor)
    console.log(parentEditor)
  }, [])
  
  
  return(
  <div className='code_block' {...attributes} contentEditable={false}>
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="#Type your code (Press CTRL+Enter to jump out of the code block)"
        spellCheck={false}
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
        onKeyUp={(event) =>{
          if(event.ctrlKey && event.keyCode === 13 ){
            console.log('in action')
            insertParagraph(parentEditor)
          }
          if(event.keyCode === 8 && editor.children.length === 1 && editor.children[0].children[0].text === ''){
            console.log('pressed')
            // Transforms.removeNodes(editor, { hanging: true})
            Transforms.removeNodes(parentEditor, { hanging: true})
            ReactEditor.focus(parentEditor)
          }
        }}
      />
    </Slate>
    {children}
  </div>
  )
}

const ImageElement = ({ attributes, children, element }) => {
  const [ className, setClassName ] = useState('center-aligned')
  const [ caption, setCaption ] = useState(false)
  const selected = useSelected()
  const focused = useFocused()
  const editor = useEditor()
  const url = element.url
  const temp = url.split('/')
  const name = temp[temp.length -1]
  const newUrl = `https://source.unsplash.com/${name}`

  useEffect(() => {
    if(caption && editor.children[editor.selection.anchor.path[0] +1].type !== 'fig-caption'){
      insertCaption(editor)
    }else{
      if(editor.children[editor.selection.anchor.path[0] +1] && editor.children[editor.selection.anchor.path[0] +1].type === 'fig-caption'){
        Transforms.removeNodes(editor, { at: [editor.selection.anchor.path[0]+1]})
      }
    }
  }, [caption])

  return (
    <figure
      className={`image-container ${className}`} 
      contentEditable={false} 
      {...attributes} 
      style={{zIndex: '10000', display: 'flex', justifyContent: 'center'}}
      
    >
      {focused && selected && <EmbedMenu className={className} setClassName={setClassName} caption={caption} setCaption={setCaption} />}
      <div className={focused && selected ? `image-wrapper wrapper-active`: `image-wrapper`} style={{
            padding: '0 0 0 0',
            position: 'relative',
          }}
          
        >
        <img
          alt='block'
          src={newUrl}
        />
      </div>
        {children}
    </figure>
  )
}

const VideoElement = ({ attributes, children, element }) => {
  const [ className, setClassName ] = useState('center-aligned')
  const [ caption, setCaption ] = useState(false)

  const focused = useFocused()
  const selected = useSelected()
  const editor = useEditor()

  const { url } = element
  let tempUrl = url.split('watch?v=')
  let newurl = ''
  if(url.includes('youtube')){
    newurl = `${tempUrl[0]}embed/${tempUrl[1]}`
  }
  else{
    newurl = url
  }

  useEffect(() => {
    if(caption && editor.children[editor.selection.anchor.path[0] +1].type !== 'fig-caption'){
      insertCaption(editor)
    }else{
      if(editor.children[editor.selection.anchor.path[0] +1].type === 'fig-caption'){
        Transforms.removeNodes(editor, { at: [editor.selection.anchor.path[0]+1]})
      }
    }
  }, [caption])
  
  return (
    <div className={`video-container ${className}`} {...attributes} contentEditable={false} style={{zIndex: '10000', display: 'flex', justifyContent: 'center'}}>
      {focused && selected && <EmbedMenu className={className} setClassName={setClassName} caption={caption} setCaption={setCaption} />}
        <div 
        className={focused && selected ? `iframe-container wrapper-active`: `iframe-container `}
          style={{
            padding: '56% 0 0 0',
            position: 'relative',
          }}
        >
          <div className={`iframe-wrapper`}></div>
          <iframe
            title='title'
            src={`${newurl}`}
            frameBorder="0"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
            allowFullScreen
          />
        </div>
      {children}
    </div>
  )
}

const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).host
  return (ext === 'unsplash.com')
}

const isVideoUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).host
  return (ext === 'youtube.com'|| ext === 'http://www.youtube.com' || ext === 'www.youtube.com' || ext === 'vimeo.com')
}


const initialValue = [
    {
        type: 'title',
        children: [{ text: '' }],
    },
    {
      type: 'paragraph',
      children: [
        { text: ''}
      ],  
    }
]

export default TextEditor