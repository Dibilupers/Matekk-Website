function Button({
  title,
  btnFunc,
  type = "default",
  imageUrl,
  buttonCustomStyle = "",
  imageCustomStyle = "",
  formSubmit = "button",
}) {
  return (
    <button
      type="button"
      onClick={btnFunc}
      className={`
        cursor-pointer w-fit rounded-full
        transition-all duration-300 active:scale-95
        text-[0.87rem] sm:text-[1rem] md:text-[0.93rem] 
        py-3 px-[5%] md:py-2 md:px-4 font-(--font-body)
        ${buttonCustomStyle}
      `}
    >
      {title}
    </button>
  );
}

export default Button;