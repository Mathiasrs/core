'use client'

import React, { useEffect, useRef } from 'react';

// Mutations
import { useUpdateContent } from '@/actions/mutations/user/useUpdateContent'

// Libraries
import EditorJS from '@editorjs/editorjs';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { z } from 'zod'
import {  ContentValidator } from '@/lib/validators/content'

import '@/styles/editor.css'


type FormData = z.infer<typeof ContentValidator>

interface EditorProps {
  data: any
}

export const Editor: React.FC<EditorProps> = ({ data: contentData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ContentValidator),
    defaultValues: {
      contentId: contentData ? contentData?.contentId : "",
      title: contentData ? contentData?.title : "",
      content: contentData ? contentData?.content : null,
    },
  })
  const mutation = useUpdateContent()
  const titleRef = useRef<HTMLTextAreaElement | null>(null);  
  const editorRef = useRef<EditorJS | null>(null);  

  useEffect(() => {
    if (contentData) {
      reset({
        contentId: contentData?.contentId,
        title: contentData?.title,
        content: contentData?.content,
      });
    }
  }, [contentData, reset]);

  useEffect(() => {
    const initializeEditor = async () => {
      const EditorJS = (await import('@editorjs/editorjs')).default
      const Header = (await import('@editorjs/header')).default
      const Embed = (await import('@editorjs/embed')).default
      const Table = (await import('@editorjs/table')).default
      const List = (await import('@editorjs/list')).default
      const Code = (await import('@editorjs/code')).default
      const LinkTool = (await import('@editorjs/link')).default
      const InlineCode = (await import('@editorjs/inline-code')).default
      const ImageTool = (await import('@editorjs/image')).default

      try {
        const editor = new EditorJS({
          holder: 'editor',
          tools: {
            header: Header,
            linkTool: {
              class: LinkTool,
              config: {
                endpoint: '/api/link',
              },
            },
            image: {
              class: ImageTool,
              config: {
                uploader: {
                  async uploadByFile(file: File) {
                    //@ts-ignore
                    const [res] = await uploadFiles([file], 'imageUploader')
  
                    return {
                      success: 1,
                      file: {
                        url: res.fileUrl,
                      },
                    }
                  },
                },
              },
            },
            list: List,
            code: Code,
            inlineCode: InlineCode,
            table: Table,
            embed: Embed,
          },
        });
        
        await editor.isReady;
        editorRef.current = editor;
      } catch (e) {
        console.error('Editor.js initialization failed', e);
      }
    };
    
    initializeEditor();
    
    return () => {
      const destroyEditor = async () => {
        if (editorRef.current) {
          try {
            await editorRef.current.isReady;         
            editorRef.current.destroy();
          } catch (e) {
            console.error('Failed to destroy Editor.js', e);
          }
        }
      };
  
      destroyEditor();
    };
  }, []);
  
    
  const { ref: registerTitleRef, ...rest } = register('title')

  return (
    <div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200'>
      <form
        id='content-form'
        className='w-fit p-2'        
        >
        <div className='prose prose-stone dark:prose-invert'>
        <TextareaAutosize
            ref={(e) => {
              registerTitleRef(e);
              titleRef.current = e; 
            }}
            {...rest}
            placeholder='Title'
            className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
          />

          <div id='editor' className='min-h-[24rem]' />

          <p className='text-sm text-gray-500'>
            Use{' '}
            <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
              Tab
            </kbd>{' '}
            to open the command menu.
          </p>
        </div>
      </form>
    </div>
  )
}
