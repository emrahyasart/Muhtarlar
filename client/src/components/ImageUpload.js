import React, { Component } from "react";
import Dropzone from "react-dropzone";
import ReactCrop from "react-image-crop";
import { Container, Button } from "semantic-ui-react";
import "react-image-crop/dist/ReactCrop.css";
import { connect } from "react-redux";
import { addImage } from "../actions/userAction";
import history from "../history";
import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef
} from "./ReusableUtils";

const imageMaxSize = 10000000;

const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";

const acceptedFileTypesArray = acceptedFileTypes.split(",").map(item => {
  return item.trim();
});

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.imagePreviewCanvasRef = React.createRef();
    this.state = {
      imgSrc: null,
      imgSrcExtension: null,
      crop: {
        unit: "px",
        x: null,
        y: null,
        width: 205,
        height: 235
      },
      fileSelected: false,
      fileCropped: false
    };
  }

  verifyFile = files => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > imageMaxSize) {
        alert("Resim boyutu " + currentFileSize + " çok büyük");
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert(
          currentFileType + " uzantılı dosya yüklemenize izin verilmemektedir."
        );
        return false;
      }
    }
    return true;
  };
  handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          "load",
          () => {
            const myResult = myFileItemReader.result;
            this.setState({
              imgSrc: myResult,
              fileSelected: true,
              imgSrcExtension: extractImageFileExtensionFromBase64(myResult)
            });
          },
          false
        );

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };
  handleImageLoaded = image => {};
  handleOnDropChange = crop => {
    console.log(crop);
    this.setState({
      crop: {
        unit: "px",
        x: crop.x,
        y: crop.y,
        width: crop.width,
        height: crop.height
        // aspect: 1
      }
    });
    this.setState({ fileCropped: true });
  };
  handleOnCropComplete = (crop, pixelCrop) => {
    const canvasRef = this.imagePreviewCanvasRef.current;
    const { imgSrc } = this.state;

    image64toCanvasRef(canvasRef, imgSrc, crop);
  };
  handleImageUpload = event => {
    event.preventDefault();
    const { imgSrc, imgSrcExtension } = this.state;
    if (imgSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current;
      const imageData64 = canvasRef.toDataURL("image/" + imgSrcExtension);
      const userId = parseInt(localStorage.userId);
      this.props.addImage(imageData64, userId);
      this.handleClearToDefault();
    }
  };

  handleClearToDefault = event => {
    if (event) event.preventDefault();
    const canvas = this.imagePreviewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.setState({
      imgSrc: null,
      fileSelected: false,
      fileCropped: false
    });
  };
  render() {
    console.log(this.props);
    console.log(localStorage);
    const { imgSrc } = this.state;
    return (
      <div>
        <div
          style={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "100px",
            borderRadius: "15px",
            border: "5px dashed teal"
          }}
        >
          <Dropzone
            maxSixe={imageMaxSize}
            multiple={false}
            onDrop={this.handleOnDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p
                    style={{
                      height: "200px",
                      textAlign: "center",
                      fontSize: "20px",
                      paddingTop: "70px",
                      color: "teal",
                      fontWeight: "bold"
                    }}
                  >
                    Resmi Buraya Sürükleyip Bırakabilir Ya da Bu Alana
                    Tıklayarak Resim Seçebilirsiniz
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <Container
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center"
          }}
        >
          {this.state.fileSelected && (
            <h1
              style={{
                textAlign: "center",
                marginTop: "30px",
                marginBottom: "10px"
              }}
            >
              Seçilen Resim
            </h1>
          )}
          <ReactCrop
            locked
            src={imgSrc}
            crop={this.state.crop}
            onImageLoaded={this.handleImageLoaded}
            onComplete={this.handleOnCropComplete}
            onChange={this.handleOnDropChange}
          />
          <br />

          {this.state.fileCropped && (
            <h1
              style={{
                textAlign: "center",
                marginTop: "30px",
                marginBottom: "10px"
              }}
            >
              Önizleme
            </h1>
          )}
          <canvas ref={this.imagePreviewCanvasRef}></canvas>
          <br />
          {this.state.fileCropped && (
            <div>
              <Button
                style={{ width: "20%", marginTop: "20px" }}
                color="teal"
                type="submit"
                onClick={this.handleImageUpload}
              >
                Resmi Kaydet
              </Button>

              <Button
                style={{ width: "20%", marginTop: "20px" }}
                color="teal"
                type="submit"
                onClick={this.handleClearToDefault}
              >
                Temizle
              </Button>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    image: state.image
  };
};

export default connect(mapStateToProps, {
  addImage
})(ImageUpload);
