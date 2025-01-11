import React from "react";

const CombinedPolicyPage = () => {
  return (
    <div className="policy-page">
      {/* 제목 */}
      <h1 className="text-4xl font-bold text-center my-8">서비스 약관 및 개인정보처리방침</h1>
      
      {/* 서비스 약관 섹션 */}
      <section className="terms-of-service my-12">
        <h2 className="text-2xl font-bold mb-4">서비스 약관</h2>
        <p>
          이 서비스 약관은 여러분과 당사 간의 계약입니다. 이 서비스 약관은 당사의 서비스를 사용하는 모든 사용자가 따라야 할 약속을 포함합니다.
        </p>
        <ol className="list-decimal ml-8 my-4">
          <li>
            <strong>서비스 이용 규칙:</strong> 사용자는 본 서비스를 합법적이고 적절한 방식으로만 사용해야 합니다.
          </li>
          <li>
            <strong>계정 관리:</strong> 사용자는 계정 정보를 안전하게 유지할 책임이 있습니다.
          </li>
          <li>
            <strong>사용 제한:</strong> 당사는 부적절한 행위가 발견될 경우 서비스 사용을 제한하거나 종료할 권리를 가집니다.
          </li>
        </ol>
        <p>
          자세한 내용은 저희 고객센터를 통해 문의해주세요. 감사합니다.
        </p>
      </section>

      {/* 개인정보처리방침 섹션 */}
      <section className="privacy-policy my-12">
        <h2 className="text-2xl font-bold mb-4">개인정보처리방침</h2>
        <p>
          귀하의 개인정보는 안전하게 보호됩니다. 당사는 귀하의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
        </p>
        <ol className="list-decimal ml-8 my-4">
          <li>
            <strong>수집하는 개인정보:</strong> 이메일, 이름, 전화번호 등 서비스 제공에 필요한 최소한의 정보만을 수집합니다.
          </li>
          <li>
            <strong>개인정보 사용 목적:</strong> 수집된 정보는 서비스 제공 및 개선을 위해 사용됩니다.
          </li>
          <li>
            <strong>개인정보 보호:</strong> 당사는 귀하의 개인정보를 보호하기 위한 적절한 기술적 및 관리적 보안을 제공합니다.
          </li>
        </ol>
        <p>
          자세한 내용은 저희 <a href="/contact" className="text-blue-500 hover:underline">고객센터</a>를 통해 문의해주세요.
        </p>
      </section>
    </div>
  );
};

export default CombinedPolicyPage;
