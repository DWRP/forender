import * as React from "react";
import renderer from "react-test-renderer";

import { MonoText, Title } from "../StyledText"; // Substitua 'NomeDoArquivo' pelo nome do arquivo onde as funções estão definidas

describe("Teste das funções MonoText e Title", () => {
  it(`MonoText renderizado corretamente`, () => {
    const tree = renderer
      .create(<MonoText>Snapshot test for MonoText!</MonoText>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  }),
    it(`Title renderizado corretamente`, () => {
      const tree = renderer
        .create(<Title>Snapshot test for Title!</Title>)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
});
