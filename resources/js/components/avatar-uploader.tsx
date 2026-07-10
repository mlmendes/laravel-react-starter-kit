import AvatarEditor, { useAvatarEditor } from 'react-avatar-editor';
import { useMotionValue, useSpring, useMotionValueEvent } from 'motion/react';
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RotateCcw, RotateCw, Trash } from 'lucide-react';
import { ButtonGroup } from './ui/button-group';

export default function AvatarUploader() {
    const [image, setImage] = useState<File | undefined>();
    const editor = useAvatarEditor();
    const [rotate, setRotate] = useState(0);
    const [animatedRotate, setAnimatedRotate] = useState(0);
    const [scale, setScale] = useState<number[]>([1.0]);
    const rotateMotion = useMotionValue(0);
    const rotateSpring = useSpring(rotateMotion, {
        stiffness: 200,
        damping: 25,
    });

    useMotionValueEvent(rotateSpring, 'change', (v) => setAnimatedRotate(v));

    if (rotateMotion.get() !== rotate) {
        rotateMotion.set(rotate);
    }

    return (
        <>
            <Dropzone
                onDrop={([file]) => setImage(file)}
                noClick={image !== undefined}
                noKeyboard
            >
                {({ getRootProps, getInputProps }) => (
                    <div
                        {...getRootProps()}
                        className="max-w-60 justify-items-center space-y-4"
                    >
                        <AvatarEditor
                            border={0}
                            borderRadius={125}
                            height={250}
                            image={image}
                            key={image ? 'with-image' : 'empty-image'}
                            ref={editor.ref}
                            rotate={animatedRotate}
                            scale={scale[0]}
                            width={250}
                        />
                        <Slider
                            max={10}
                            min={1.0}
                            onValueChange={(value) => setScale(value)}
                            step={0.1}
                            value={scale}
                        />
                        <ButtonGroup>
                            <Button
                                onClick={() => setRotate((r) => r - 90)}
                                size="icon"
                                type="button"
                                variant="outline"
                            >
                                <RotateCcw />
                            </Button>
                            <Button
                                onClick={() => setRotate((r) => r + 90)}
                                size="icon"
                                type="button"
                                variant="outline"
                            >
                                <RotateCw />
                            </Button>
                            <Button
                                onClick={() => {
                                    setImage(undefined);
                                    setScale([1.0]);
                                    setRotate(0);
                                }}
                                size="icon"
                                type="button"
                                variant="destructive"
                            >
                                <Trash />
                            </Button>
                        </ButtonGroup>
                        <input {...getInputProps()} />
                    </div>
                )}
            </Dropzone>
        </>
    );
}
