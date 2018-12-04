class S extends Mino {
  constructor() {
    let pattern = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];
    super(pattern, Color.S);
  }
}