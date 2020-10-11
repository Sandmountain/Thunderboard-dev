import {
	Avatar,
	Button,
	CircularProgress,
	DialogContent,
	DialogContentText,
	DialogTitle,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Slider,
	TextField,
	Typography,
} from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const marks = (min, max) => {
	return [
		{
			value: min,
			label: min,
		},
		{
			value: max,
			label: max,
		},
	];
};

export default function RedditTab({
	settings,
	testChanges,
	setSettings,
	toggleMovement,
}) {
	const { shufflePosts, postLimit, subreddits } = settings;
	//const [mails, setNrOfMails] = useState(nrOfMails);

	const [tempSubReddits, setTempSubreddit] = useState(subreddits);
	const [loadingNewSubreddit, setLoadingNewSubreddit] = useState(false);
	const [input, setInput] = useState("");
	//const [newSubReddit, setNewSubreddit] = useState("");
	/*
  const handleChange = (e, val) => {
    setNrOfMails(val);
    if (val !== settings.nrOfMails) {
      setSettings({ ...settings, nrOfMails: mails });
    }
  };
*/

	const loadImages = useCallback(async () => {
		if (tempSubReddits[0].url === "") {
			setLoadingNewSubreddit(true);
			console.log("log");
			const loadImages = await Promise.all(
				tempSubReddits.map(async (subreddit) => {
					console.log(subreddit);
					return {
						name: subreddit.name,
						url: await axios
							.get(
								`https://www.reddit.com/r/${subreddit.name}/about.json`,
							)
							.then((res) => res.data.data.icon_img),
					};
					/*
                Promise.resolve(
                        await axios
                            .get(
                                `https://www.reddit.com/r/${subreddit.name}/about.json`,
                            )
                            .then((res) => res.data.data.icon_img),
                    ),
                */
				}),
			);

			console.log("called again");
			setTempSubreddit(loadImages);
			setLoadingNewSubreddit(false);
		}
	}, [tempSubReddits]);

	useEffect(() => {
		loadImages();
	}, [loadImages]);

	const validateSubReddit = async () => {
		try {
			setLoadingNewSubreddit(true);
			const newImg = await axios
				.get(`https://www.reddit.com/r/${input}/about.json`)
				.then((res) => res.data.data.icon_img);

			if (newImg) {
				setTempSubreddit([
					{ name: input, url: newImg },
					...tempSubReddits,
				]);
				setLoadingNewSubreddit(false);
				return true;
			} else {
				setLoadingNewSubreddit(false);
				return false;
			}
		} catch (error) {
			console.error(error);
			setLoadingNewSubreddit(false);
			return false;
		}
	};

	const handleNewSubreddit = async (e) => {
		e.preventDefault();
		setInput("");
		const isValid = await validateSubReddit();
		console.log(isValid);
		if (isValid) {
			console.log(tempSubReddits);
		} else {
			// Set error
		}
	};
	const handleInput = (e) => {
		e.preventDefault();
		setInput(e.target.value);
	};

	const testValue = () => {
		testChanges();
	};

	return (
		<>
			<DialogTitle>
				<div
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					Reddit settings
					<Button variant="outlined" onClick={() => testValue()}>
						{" "}
						Test Changes
					</Button>
				</div>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Enter the subreddits you wish to follow
				</DialogContentText>
				<form
					onSubmit={handleNewSubreddit}
					noValidate
					autoComplete="off"
				>
					<TextField
						fullWidth
						label="Enter the name of a subreddit"
						value={input}
						onChange={handleInput}
						helperText={tempSubReddits.length + " subreddits"}
					></TextField>
				</form>
				<List
					dense
					style={{
						overflowY: "auto",
						height: "140px",
						padding: 0,
						marginTop: 8,
						marginBottom: 8,
					}}
				>
					{!loadingNewSubreddit ? (
						tempSubReddits.map((subreddit, idx) => {
							return (
								<ListItem key={idx} button>
									<ListItemAvatar>
										{subreddit.url ? (
											<Avatar src={subreddit.url} />
										) : (
											<Avatar>
												{" "}
												{subreddit.name
													.substring(0, 1)
													.toUpperCase()}
											</Avatar>
										)}
									</ListItemAvatar>
									<ListItemText primary={subreddit.name} />
									<ListItemSecondaryAction>
										<CheckBox
											edge="end"
											//onChange={handleToggle(value)}
											//checked={checked.indexOf(value) !== -1}
											checked={false}
											//inputProps={{ 'aria-labelledby': labelId }}
										/>
									</ListItemSecondaryAction>
								</ListItem>
							);
						})
					) : (
						<CircularProgress />
					)}
				</List>
			</DialogContent>
			<DialogContent>
				<DialogContentText>
					Enter the subreddits you wish to follow
				</DialogContentText>
			</DialogContent>
		</>
	);
}
