
function Comment() {
  return (
    <>
      <div>
        <h2>Comments</h2>
        <ul>
          <li>Sample Comment 1</li>
          <li>Sample Comment 2</li>
          <li>Sample Comment 3</li>
        </ul>
        <form>
          <textarea
            placeholder="Add a comment"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Comment;
