"use client"

import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useDropzone } from "react-dropzone"
import { useFormContext } from "react-hook-form"

import { AnimatePresence, motion, useWillChange } from "framer-motion"

import { IconTrash } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

import { fileToBase64 } from "@/lib/fileToBase64"
import { cn } from "@/lib/utils"

interface FormImageProps {
  name: string
  textButton: string
  imgRender: ReactElement
}

const FormDropImg: FC<FormImageProps> = ({
  name,
  textButton,
  imgRender,
}: FormImageProps) => {
  const form = useFormContext()
  const { watch } = form

  const [imagePreview, setImagePreview] = useState<string | undefined>()
  const [imgExist, setImgExist] = useState<string | undefined>()

  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setImgExist(watch(name) ?? "")
    setImagePreview(watch(name) ?? "")
  }, [])

  const willChange = useWillChange()
  const MotionButton = motion(Button)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      form.setValue(name, acceptedFiles[0], {
        shouldValidate: true,
        shouldDirty: true,
      })
      fileToBase64(acceptedFiles[0], setImagePreview)
    },
    [form]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
      "image/jfif": [],
      "image/gif": [],
      "image/svg+xml": [],
      "image/bmp": [],
      "image/tiff": [],
    },
  })

  return (
    <>
      <div className="h-full w-full border border-black">
        {imagePreview ? (
          <motion.div
            className="relative flex h-full w-full items-center justify-center"
            whileHover={{ opacity: 0.9 }}
            style={{ willChange }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <AnimatePresence>
              {isHovered && (
                <MotionButton
                  className="t-base absolute z-50 py-4 "
                  variant={"destructive"}
                  size={"sm"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    setImagePreview(undefined)
                    form.setValue(name, undefined)
                  }}
                >
                  <IconTrash className="mr-4" />
                  Delete
                </MotionButton>
              )}
            </AnimatePresence>
            {imgExist === imagePreview
              ? React.cloneElement(imgRender, {
                  imgData: { [name]: imagePreview },
                })
              : React.cloneElement(imgRender, { forForm: imagePreview })}
            {}
          </motion.div>
        ) : (
          <>
            <div
              {...getRootProps({})}
              className="flex h-full w-full items-center justify-center"
            >
              <input {...getInputProps()} />
              {React.cloneElement(imgRender, { forForm: imagePreview })}
              {!isDragActive && (
                <Button
                  size={"sm"}
                  type="button"
                  variant="black_out"
                  className="absolute bg-white p-4"
                >
                  {textButton}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      <div className="mb-[10px]">
        {form.formState.errors?.[name] && (
          <p className={cn("text-sm font-medium text-destructive")}>
            {
              form.formState?.errors?.[name]
                ?.message as keyof typeof form.formState.errors
            }
          </p>
        )}
      </div>
    </>
  )
}

export default FormDropImg
