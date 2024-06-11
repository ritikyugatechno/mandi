export default function Demo() {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td contentEditable={true}>hello</td>
            <td>15</td>
          </tr>
          <tr>
            <td>asdfsad</td>
            <td>13</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
