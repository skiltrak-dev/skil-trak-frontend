import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

// Icons
import { BsFillPlayCircleFill } from "react-icons/bs";

export const VideoPreview = ({ url }: { url: any }) => {
	const [thumbnail, setThumbnail] = useState("");

	const [video, setVideo] = useState({
		url: null,
		pip: false,
		playing: true,
		controls: false,
		light: true,
		volume: 0.8,
		muted: false,
		played: 0,
		loaded: 0,
		duration: null,
		secondsElapsed: null,
		playbackRate: 1.0,
		loop: false,
	});

	useEffect(() => {
		setVideo((preVal) => ({
			...preVal,
			light: true,
		}));
	}, [url]);

	useEffect(() => {
		const getVideoThumbnail = async () => {
			const videoThumbnail: any = await generateVideoThumbnail(url);
			setThumbnail(videoThumbnail);
		};
		getVideoThumbnail();
	}, [url]);

	const generateVideoThumbnail = (file: any) => {
		return new Promise((resolve) => {
			const canvas = document.createElement("canvas");
			const video = document.createElement("video");

			// this is important
			video.autoplay = true;
			video.muted = true;
			video.src = file;

			video.onloadeddata = () => {
				const ctx = canvas.getContext("2d");

				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;

				if (ctx)
					ctx.drawImage(
						video,
						0,
						0,
						video.videoWidth,
						video.videoHeight
					);

				video.pause();
				return resolve(canvas.toDataURL("image/png"));
			};
		});
	};

	const onReady = () => {
		setVideo((preVal) => ({
			...preVal,
			light: false,
		}));
	};

	return (
		<div className="w-full h-full">
			<ReactPlayer
				onReady={onReady}
				url={url}
				width="100%"
				height="100%"
				playing={video.playing}
				duration={5000}
				currenttime={5}
				volume={video.volume}
				config={{
					file: { attributes: { controlsList: "nodownload" } },
				}}
				controls
				playIcon={
					<div className="w-full h-full flex justify-center items-center relative">
						<BsFillPlayCircleFill className="text-7xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

						{/* generating thumbnail for video */}
						{!url?.split(".").includes("youtube") && (
							<img
								className="w-full h-full object-cover"
								src={thumbnail}
								alt=""
							/>
						)}
					</div>
				}
				light={video.light}
			/>
		</div>
	);
};
