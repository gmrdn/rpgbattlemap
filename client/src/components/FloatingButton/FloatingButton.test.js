import React from "react";
import { shallow } from "enzyme";
import { FloatingButton } from "./FloatingButton";

describe("Components", () => {
  describe("Floating Button", () => {
    it("opens the add token dialog with the floating action button", async () => {
      //   wrapper = mount(
      //     <Provider store={store}>
      //       <Grid
      //         roomId={roomId}
      //         nickname={nickname}
      //         socket={socket}
      //         addToken={addTokenMock}
      //         resetTokens={resetTokensMock}
      //         selectToken={selectTokenMock}
      //         tokens={mockTokens}
      //         openNewTokenDialog={openNewTokenDialog}
      //       />
      //     </Provider>
      //   );
      const mockEvent = {
        preventDefault: () => {},
        target: {
          id: "fab-addtoken",
        },
      };

      const openNewTokenDialog = jest.fn();
      const wrapper = shallow(
        <FloatingButton
          openNewTokenDialog={openNewTokenDialog}
        ></FloatingButton>
      );
      const fab = wrapper.find("#fab-addtoken");
      fab.simulate("click", mockEvent);
      expect(openNewTokenDialog).toHaveBeenCalledWith(true);
    });
  });
});
