import Image from "next/image";
import { FC } from "react";

interface Props {
    className?: string,
    src: string,
    alt: string,
    width: number,
    height: number
}

const ImageBox: FC<Props> = ({ className, src, alt, width, height }) => {
    return (
        <div className={className} style={{
            // position: "relative",
            overflow: "hidden",
            fontSize: "0"
        }}>
            {/* {width ?
                <Image src={src} alt={alt} width={width} height={height} objectFit="cover"/>
                :
                <Image src={src} alt={alt} layout="fill" objectFit="cover"/>
            } */}
            <Image src={src} alt={alt} width={width} height={height} objectFit="cover"/>
        </div>
    )
}

export default ImageBox;