import * as React from "react";
import renderer from "react-test-renderer";
import { Text, TextInput, View } from "../Themed"; // Substitua 'NomeDoArquivo' pelo nome do arquivo onde as funções estão definidas

describe("Testando a renderização dos componentes do tema", () => {
  it(`Text renderiza corretamente`, () => {
    const tree = renderer.create(<Text>Snapshot test for Text!</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`TextInput renderiza corretamente`, () => {
    const tree = renderer
      .create(<TextInput placeholder="Snapshot test for TextInput!" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`TextInput(senha) renderiza corretamente`, () => {
    const tree = renderer
      .create(
        <TextInput
          placeholder="Snapshot test for Password TextInput!"
          secureTextEntry={true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`View renderiza corretamente`, () => {
    const tree = renderer
      .create(<View style={{ width: 100, height: 100 }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
