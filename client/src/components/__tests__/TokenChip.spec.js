import React from "react";
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { TokenChip } from "../TokenChip";
import Chip from "@material-ui/core/Chip";

let wrapper;
describe("Components", () => {
  describe("TokenChip", () => {
    describe("renders a selected or unselected chip", () => {
      it("renders an unselected token chip", () => {
        const token = {
          _id: "1234567890",
          x: 1,
          y: 1,
          image: "1.png",
          color: "red",
          name: "Jest Token",
          selected: false,
        };

        act(() => {
          wrapper = shallow(<TokenChip token={token} />);
        });

        expect(wrapper.find(Chip).prop("label")).toBe("Jest Token");
        expect(wrapper.find(Chip).prop("color")).toBe("default");
      });

      it("renders a selected token chip", () => {
        const token = {
          x: 1,
          y: 1,
          image: "1.png",
          color: "red",
          name: "Jest Token",
          selected: true,
        };

        act(() => {
          wrapper = shallow(<TokenChip token={token} />);
        });

        expect(wrapper.find(Chip).prop("label")).toBe("Jest Token");
        expect(wrapper.find(Chip).prop("color")).toBe("primary");
      });
    });

    describe("handles user actions", () => {
      it("handles token selection", () => {
        const token = {
          _id: "1234567890",
          x: 1,
          y: 1,
          image: "1.png",
          color: "red",
          name: "Jest Token",
          selected: false,
        };
        const selectTokenMock = jest.fn();
        const mockEvent = {
          preventDefault: () => {},
          target: {
            parentNode: {
              getAttribute: jest.fn().mockReturnValueOnce("1234567890"),
            },
          },
        };

        wrapper = shallow(
          <TokenChip token={token} selectToken={selectTokenMock} />
        );
        const chip = wrapper.find(Chip);

        act(() => {
          chip.simulate("click", mockEvent);
        });

        expect(selectTokenMock).toHaveBeenCalled();
      });

      it("handles token deletion", () => {
        const token = {
          _id: "1234567890",
          x: 1,
          y: 1,
          image: "1.png",
          color: "red",
          name: "Jest Token",
          selected: false,
        };
        const prepareDeleteTokensMock = jest.fn();
        const openDeleteTokenDialogMock = jest.fn();

        const mockEvent = {
          preventDefault: () => {},
          target: {
            parentNode: {
              getAttribute: jest.fn().mockReturnValueOnce("1234567890"),
            },
          },
        };

        wrapper = shallow(
          <TokenChip
            token={token}
            prepareDeleteTokens={prepareDeleteTokensMock}
            openDeleteTokenDialog={openDeleteTokenDialogMock}
          />
        );
        const chip = wrapper.find(Chip);

        act(() => {
          chip.simulate("delete", mockEvent);
        });

        expect(prepareDeleteTokensMock).toHaveBeenCalled();
        expect(openDeleteTokenDialogMock).toHaveBeenCalled();
      });
    });
  });
});
