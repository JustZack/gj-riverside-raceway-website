import React from "react";

export interface BannerProps {
	media: React.ReactNode; //The background
	className?: string; //Additional classes for the container
	children?: React.ReactNode; //Overlay children
	style?: React.CSSProperties; //Additional styles for the container
	mediaClassName?: string; //Classes for the media element
	mediaStyle?: React.CSSProperties; //Styles for the media element
}

/**
 * Banner component that displays a media (image, video, etc.) filling its container,
 * with support for overlaying arbitrary children.
 */
export default function Banner({ media, className = "", children, style={ height: "200px" }, mediaClassName = "", mediaStyle = {} }: BannerProps) {
	return (
		<div className={`relative w-full h-full overflow-hidden ${className}`} style={style} >
			<div className="absolute inset-0 w-full h-full">
				{React.isValidElement(media)
					? React.cloneElement(media, {
						className: `${media.props.className || ""} object-cover w-full h-full ${mediaClassName}`,
						style: { ...media.props.style, width: "100%", height: "100%", objectFit: "cover", ...mediaStyle },
					})
					: media}
			</div>
			{children && (
				<div className="absolute inset-0 w-full h-full">
					{children}
				</div>
			)}
		</div>
	);
}
