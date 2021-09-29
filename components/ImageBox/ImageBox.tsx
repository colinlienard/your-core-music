import Image from "next/image";
import { FC } from "react";

interface Props {
    className?: string,
    src: string,
    alt: string,
    width: number,
    height: number,
    quality?: number
}

const ImageBox: FC<Props> = ({ className, src, alt, width, height, quality }) => {
    return (
        <div className={className} style={{
            overflow: "hidden",
            fontSize: "0"
        }}>
            <Image src={src} alt={alt} width={width} height={height} quality={quality ? quality : ""} objectFit="cover"/>
        </div>
    )
}

export default ImageBox;