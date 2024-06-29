
const imageHoverPopover = (imageSource) =>
  imageSource !== "" ? (
    <img className="h-[200px] w-[160px] object-cover" src={imageSource} />
  ) : (
    <span>Upload image</span>
  );

export default imageHoverPopover;
