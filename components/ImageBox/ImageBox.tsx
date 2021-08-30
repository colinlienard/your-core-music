import Image from "next/image";
import { FC } from "react";

interface Props {
    className?: string,
    src: string,
    alt: string,
    width?: number,
    height?: number
}

const ImageBox: FC<Props> = ({ className, src, alt, width, height }) => {
    return (
        <div className={className} style={{ position: "relative", overflow: "hidden" }}>
            {width ?
                <Image src={src} alt={alt} layout="fixed" width={width} height={height} placeholder={width > 40 ? "blur" : "empty"} blurDataURL={width > 40 ? src : ""}/>
                :
                <Image src={src} alt={alt} layout="fill" objectFit="cover" placeholder="blur" blurDataURL={src}/>
            }
        </div>
    )
}

export default ImageBox;