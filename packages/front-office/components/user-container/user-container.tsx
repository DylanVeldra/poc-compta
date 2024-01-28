import { useState, useEffect } from "react";
import { SubWindow } from "@shared-components/sub-window";

// Helpers
import { useLanguageDictionary } from "@shared-hooks";
import { fetchJSON } from "@shared-utils";
import { useForm } from "react-hook-form";

// Yup Validation helper
import { signUpValidation } from "@shared-utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { SingleLineInput } from "@shared-components/inputs";

import countryList from "countries-list/dist/countries.emoji.json";
import { User } from "@shared-types";
import { Container } from "@shared-components/container";

const UserContainer = () => {
  const dict = useLanguageDictionary();
  const [user, setUser] = useState<User>();

  const {
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpValidation().schema),
    defaultValues: signUpValidation().initialValues,
    mode: "onBlur",
  });

  const handleUsersChange = (name: string, value: string) => {
    setUser((prev?: User) => ({ ...prev, [name]: value } as User));
  };

  useEffect(() => {
    fetchJSON("/user").then((res) => {
      setUser(res.body);
    });
  }, []);

  return (
    <div className="mt-[60px] max-w-[804px] mx-auto">
      <SubWindow header={<>{dict.accountManagement.dashboard.subtitle}</>}>
        <div className="">
          <Container noBorder>
            <SingleLineInput
              label={dict.registerFields.firstname}
              name="firstname"
              required={true}
              value={user?.firstname}
              rounded={"rounded-t-md"}
              disabled
            />
          </Container>
          <Container noBorder>
            <SingleLineInput
              label={dict.registerFields.lastname}
              name="lastname"
              required={true}
              value={user?.lastname}
              rounded={"rounded-none"}
              noBorderBottom
              noBorderTop
              disabled
            />
          </Container>

          <Container noBorder>
            <SingleLineInput
              name={"birthDate"}
              label={dict.registerFields.birthDate}
              value={
                user ? new Date(user.birthDate).toLocaleDateString("fr") : ""
              }
              onChange={(e) => handleUsersChange("birthDate", e)}
              rounded={"rounded-b-md"}
              disabled
            />
          </Container>

          <div className="mt-5">
            <Container noBorder>
              <SingleLineInput
                name={"phoneNumber"}
                label={dict.registerFields.phoneNumber}
                value={user?.phoneNumber}
                onChange={(e) => handleUsersChange("phoneNumber", e)}
                rounded={"rounded-t-md"}
                noBorderBottom
                disabled
              />
            </Container>
            <Container noBorder>
              <SingleLineInput
                type="email"
                label="Email"
                name="email"
                required={true}
                maxlength={256}
                value={user?.email}
                disabled
                rounded={"rounded-none"}
              />
            </Container>
            <Container noBorder>
              <SingleLineInput
                label={dict.registerFields.telegramKey}
                name="telegram"
                value={user?.telegramAccount ?? "-"}
                disabled
                noBorderTop
                rounded={"rounded-b-md"}
              />
            </Container>
          </div>

          <div className="mt-5">
            <Container noBorder>
              <SingleLineInput
                name={"taxResidenceCountry"}
                label={dict.registerFields.country}
                value={
                  (countryList as any)[
                    user?.taxResidenceCountry as keyof typeof countryList
                  ]?.name
                }
                disabled
              />
            </Container>
          </div>
        </div>
      </SubWindow>
    </div>
  );
};

export default UserContainer;
