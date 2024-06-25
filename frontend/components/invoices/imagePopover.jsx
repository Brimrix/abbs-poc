
const imageHoverPopover = (record) =>
    record.image_src !== "" ? (
    <img className="h-[200px] w-[160px] object-cover" src={record.image_src} />
  ) : (
    <span>Upload image</span>
  );

  export default imageHoverPopover;
