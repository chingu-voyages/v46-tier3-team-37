import Button from "@/components/uiComponents/Button";
import Card from "@/components/uiComponents/Card";

export default function Profile() {
  return (
    <section className="flex justify-center mt-4">
            <ul className="flex lg:w-1/2  gap-2 flex-col">
                <li key={1}>
                    <Card variant={'default'} title={'lawn mower'} description="Green eggs and lawn lowers! I cut grass and pass gas.">
                        <Button variant={'thin'} size={'sm'} cardType="default">cancel</Button>
                    </Card>
                </li>
                <li key={1}>
                    <Card variant={'default'} title={'lawn mower'} description="Green eggs and lawn lowers! I cut grass and pass gas.">
                        <Button variant={'thin'} size={'sm'} cardType="default">cancel</Button>
                    </Card>
                </li>
                <li key={1}>
                    <Card variant={'default'} title={'lawn mower'} description="Green eggs and lawn lowers! I cut grass and pass gas.">
                        <Button variant={'thin'} size={'sm'} cardType="default">cancel</Button>
                    </Card>
                </li>
            </ul>
        </section>
  )
}
