// ------------------------------------------------------------------------------
// 📌 인터페이스 다시 열기 (Reopening Interfaces)
// ⭐️ URL : https://bit.ly/3GdT7qD
// ------------------------------------------------------------------------------
// - 타입 별칭과 달리, 인터페이스는 정의된 이후 다시 열어 새 프로퍼티를 추가할 수 있습니다.
// ------------------------------------------------------------------------------

// Person 타입을 인터페이스로 변경해 정의 후 다시 열어 정의하는 구문을 작성해봅니다.

{
  // type Person = {
  //   name: string;
  //   age: number;
  // };

  // type Person = {
  //   gender: '남성' | '여성';
  //   job?: string;
  // };

  // const hyeji: Person = {
  //   name: '류혜지',
  //   age: 12,
  //   gender: '여성',
  // };

  interface Person {
    name: string;
    age: number;
  }

  interface Person {
    gender: "남성" | "여성";
    job?: string;
  }

  const hyeji: Person = {
    name: "류혜지",
    age: 12,
    gender: "여성",
    job: "강사",
  };
}
