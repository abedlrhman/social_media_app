import React, {useState, useRef} from 'react'
import Cropper from 'react-easy-crop'
import styled from 'styled-components'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles} from '@material-ui/core'
import Slider from "@material-ui/core/Slider"
import Button from "@material-ui/core/Button"


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

let onUpload;

function ImageCropper(props) {

	const classes = useStyles();

  const inputRef = useRef();

	const triggerFileSelectPopup = () => {
		inputRef.current.click();
		setOpen(true)
	}

	const [image, setImage] = useState(null);
	const [croppedArea, setCroppedArea] = useState(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [open, setOpen] = useState(false)

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

	onUpload = () => {
		props.image(image)
		props.croppedArea(croppedArea)
		setOpen(false)
	};


	let ContainerButtonsStyles = {
		marginLeft : '6%'};

	if(open && image) {
		ContainerButtonsStyles = {
			marginLeft : "3%", 
			bottom : '6%',
			position : 'absolute'
		}
	}

  return (
    <Container className="container">
			<CropperContainer>
				{image ? (
					<>
						{open?(
							<>
								<CropperWrapper>
									<Cropper
										id='Cropper'
										image={image}
										crop={crop}
										zoom={zoom}
										aspect={1}
										onCropChange={setCrop}
										onZoomChange={setZoom}
										onCropComplete={onCropComplete}
									/>
								</CropperWrapper>
		
								<SliderWrapper>
									<Slider
										min={1}
										max={3}
										step={0.1}
										value={zoom}
										onChange={(e, zoom) => setZoom(zoom)}
									/>
								</SliderWrapper>
							</>
						) : (null)}
					</>
				) : null}
			</CropperContainer>

			<ContainerButtons style={ContainerButtonsStyles}>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
				/>
				<Button
					variant='contained'
					background='var(--main-color)'
					onClick={triggerFileSelectPopup}
					style={{ marginRight: "10px", background: "var(--main-color)", color: "white" }}
				>
					{open? ('choose picture') : ('profile picture')}
				</Button>
				{open?(
					<>
						{image?(
							<Button
								variant="contained"
								className={classes.button}
								startIcon={<CloudUploadIcon />}
								style={{background: "var(--yellow-color)"}}
								onClick={onUpload}
							>
								Upload
							</Button>
						) : (null)}
					</>
				): null}
			</ContainerButtons>
		</Container>
  )
}

export default ImageCropper


const Container = styled.div`

`

const CropperContainer = styled.div`

`

const CropperWrapper = styled.div`
	position: absolute;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	div img {
		max-width: 400px;
	}

	div img:active {
		object-fit: contain;
	}
	
	div div {
		width: 400px;
		height: 400px;
	}
`

const SliderWrapper = styled.div`
	position: absolute;
	bottom: 15%;
	min-width: 300px;
	max-width: 600px;
	width: 400px;
	margin-left: -2%;
	margin-top: 30px;
`

const ContainerButtons = styled.div`
`
    