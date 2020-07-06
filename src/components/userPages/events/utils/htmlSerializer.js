import React from 'react'
import escapeHtml from 'escape-html'
import Prism from 'prismjs'
import { Text } from 'slate'

const serialize = node => {
    if (Text.isText(node)) {
        if(node.bold){
            // console.log(node.text)
            return `<strong>${escapeHtml(node.text)}</strong>`
        }
        if (node.code) {
            return `<code>${escapeHtml(node.text)}</code>`
        }

        if (node.italic) {
            return `<em>${escapeHtml(node.text)}</em>`
        }

        return node.text
    //   return escapeHtml(node.text)
    }
    let newurl
    const children = node.children.map(n => serialize(n)).join('')
    if (node.type === 'video'){
        const url = node.url
        let tempUrl = url.split('watch?v=')
        if(url.includes('youtube')){
            newurl = `${tempUrl[0]}embed/${tempUrl[1]}`
        }
    }
    if(node.type === 'image'){
        const url = node.url
        const temp = url.split('/')
        const name = temp[temp.length -1]
        newurl = `https://source.unsplash.com/${name}`
    }

    if(node.type === 'code-line'){
        // children.codeline = true
        const jsxTokens = Prism.tokenize(children, Prism.languages['javascript'])
        let htmlString = ''
        for (const token of jsxTokens) {
            
            
            if(typeof token !== 'string'){
                htmlString = htmlString + `<span class="token ${token.type}" >${token.content}</span>`
            }
            else{
                htmlString = htmlString + escapeHtml(token)
            }
        }
        return `<pre>${htmlString}</pre>`
    }

    
  
    switch (node.type) {
        case 'block-quote':
            return `<blockquote><p>${children}</p></blockquote>`
        case 'paragraph':
            return `<p>${children}</p>`
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
        case 'code_block':
            return `<div class='code_block'>${children}</div>`
        case 'code-line':
            return `<pre>${children}</pre>`
        case 'heading-one':
            return `<h2>${children}</h2>`
        case 'heading-two':
            return `<h3>${children}</h3>`
        case 'bulleted-list':
            return `<ul>${children}</ul>`
        case 'numbered-list':
            return `<ol>${children}</ol>`
        case 'list-item':
            return `<li>${children}</li>`
        case 'image':
            return `<div class='image-container'><img alt=${escapeHtml(node.url)} src=${escapeHtml(newurl)} />${children}</div>`
        case 'video':
            return `<div class='video-container'><iframe title='Youtube Video' src=${escapeHtml(newurl)} />${children}</div>`
        case 'title':
            return null
        default:
            return children
    }
  }

const RenderBody = ({bodyValue}) => {
    bodyValue = JSON.parse(bodyValue)
    return bodyValue.map((node, index) => {
        return(
            <div key={index} className='element-wrapper' dangerouslySetInnerHTML={{__html: serialize(node) }} />
        )
    })
}

export default RenderBody