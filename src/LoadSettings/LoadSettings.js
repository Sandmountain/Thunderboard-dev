export const LoadSettings = () => {
	const settings = {
		windowSize: [1920, 1080],
		collectionID: "", //8602161
		customURL: "",
		imageType: "unisplash",
		isDraggable: false,
		nrOfCols: 12,
		rowHeight: 30,
		gridSpacing: [10, 10],
		compactType: "vertical",
		nrOfMails: 20,
		nrOfVideos: 8,
		youtubeInfo: {
			showTitle: true,
			showChannel: true,
			showViews: true,
			showUpload: true,
		},
		subreddits: [
			{
				name: "politics",
				url: "",
			},
			{
				name: "RocketLeague",
				url: "",
			},
			{
				name: "cursedcomments",
				url: "",
			},
		],
		postLimit: 5,
		shufflePosts: true,
	};

	return settings;
};
