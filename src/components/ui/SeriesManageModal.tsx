import {
  Button,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
  TextInput,
} from "flowbite-react";
import type React from "react";
import { useEffect, useState, type FormEvent } from "react";
import { createSeries, deleteSeries, getAllSeries } from "../../api/SeriesApi";
import type { SeriesResponse } from "../../types/Series";
import { handleError, handleSuccess } from "../../utils/notifier";

const customInputTheme = {
  field: {
    input: {
      base: "!bg-main/50 !text-primary-text !border-secondary-text/20 block w-full border disabled:cursor-not-allowed disabled:opacity-50 rounded-lg transition-all",
      colors: {
        gray: "focus:!border-accent focus:!ring-accent/30",
      },
    },
  },
};

const customTextareaTheme = {
  base: "!bg-main/50 !text-primary-text !border-secondary-text/20 block w-full rounded-lg border text-sm focus:!border-accent focus:!ring-accent/30 transition-all",
};

interface SeriesManageModalProps {
  onClose: () => void;
}

/**
 * 시리즈 관리 모달 컴포넌트
 *
 * @param props.onClose 모달 닫기 핸들러
 * @returns 시리즈 관리 모달 JSX
 */
const SeriesManageModal: React.FC<SeriesManageModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allSeries, setAllSeries] = useState<SeriesResponse[]>([]);

  const fetchAllSeries = async () => {
    try {
      const data = await getAllSeries();

      setAllSeries(data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchAllSeries();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      handleError(new Error("시리즈 제목은 필수입니다."));
    }

    const newSeries = {
      title,
      description,
    };

    try {
      const data = await createSeries(newSeries);

      handleSuccess(`시리즈 등록완료: [${data.seriesId}]`, () => {
        setTitle("");
        setDescription("");
        fetchAllSeries();
      });
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async (seriesId: number) => {
    try {
      await deleteSeries(seriesId);
      handleSuccess(`시리즈 삭제완료: [${seriesId}]`, () => {
        fetchAllSeries();
      });
    } catch (err) {
      handleError(err);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  return (
    <Modal show={true} onClose={onClose} size="lg">
      <ModalHeader className="bg-surface text-primary-text border-secondary-text/10 border-b p-4 text-lg">
        시리즈 관리
      </ModalHeader>

      <ModalBody className="bg-surface">
        <div className="space-y-4">
          {/* 등록 폼 */}
          <section>
            <div className="mb-2 flex items-center gap-4">
              <div className="w-18 shrink-0">
                <Label
                  htmlFor="title"
                  className="text-secondary-text text-sm font-medium"
                >
                  제목 (필수)
                </Label>
              </div>
              <div className="flex-1">
                <TextInput
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="제목 (필수)"
                  required
                  theme={customInputTheme}
                />
              </div>
            </div>
            <div className="mb-2 flex items-center gap-4">
              <div className="w-18 shrink-0">
                <Label
                  htmlFor="description"
                  className="text-secondary-text text-sm font-medium"
                >
                  개요
                </Label>
              </div>
              <Textarea
                id="description"
                className="!bg-main/50 focus:ring-accent/30 border-secondary-text/20 flex-1"
                onChange={handleDescriptionChange}
                value={description}
                rows={3}
                theme={customTextareaTheme}
              />
            </div>
            <div className="flex justify-end">
              <Button
                size="xs"
                type="submit"
                className="!bg-accent hover:!bg-accent-hover !text-on-accent border-none"
                onClick={handleSubmit}
              >
                신규 등록
              </Button>
            </div>
          </section>

          <hr className="border-secondary-text/10 my-6" />

          <section>
            <h3 className="text-primary-text mb-3 font-medium">
              목록 총 [{allSeries.length ?? 0}] 건
            </h3>
            <div className="border-secondary-text/10 max-h-60 overflow-y-auto rounded-xl border">
              <ListGroup>
                {allSeries.length !== 0 ? (
                  allSeries.map((series) => (
                    <ListGroupItem
                      key={series.seriesId}
                      className="!bg-surface hover:!bg-main border-secondary-text/5 border-b transition-colors last:border-none"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="text-primary-text truncate text-sm font-medium">
                          <span className="text-secondary-text/60 mr-2 text-xs">
                            [{series.seriesId}] -{" "}
                          </span>
                          {series.title}
                        </div>
                        <Button
                          color="red"
                          size="xs"
                          className="opacity-60 transition-opacity hover:opacity-100"
                          onClick={() => handleDelete(series.seriesId)}
                        >
                          삭제
                        </Button>
                      </div>
                    </ListGroupItem>
                  ))
                ) : (
                  // allSeries.map((series: SeriesResponse) => series.title)
                  <ListGroupItem className="!bg-main !text-secondary-text hover:!bg-secondary-text/10 border-none">
                    등록된 시리즈가 없습니다.
                  </ListGroupItem>
                )}
              </ListGroup>
            </div>
          </section>
        </div>
      </ModalBody>

      <ModalFooter className="!bg-surface border-secondary-text/10 flex justify-end border-t p-3">
        <Button
          color="alternative"
          size="sm"
          onClick={onClose}
          className="!bg-main !text-secondary-text hover:!bg-secondary-text/10 border-none"
        >
          닫기
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SeriesManageModal;
